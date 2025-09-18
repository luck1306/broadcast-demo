package net.broadcast.chatting.domain.user.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.domain.user.domain.repository.UserRepository;
import net.broadcast.chatting.domain.user.domain.type.UserRole;
import net.broadcast.chatting.domain.user.exception.AlreadyNicknameExistException;
import net.broadcast.chatting.domain.user.exception.BadRequestTokenTypeException;
import net.broadcast.chatting.domain.user.exception.DifferentTokenException;
import net.broadcast.chatting.domain.user.exception.NoSuchUserException;
import net.broadcast.chatting.domain.user.exception.NotLoginCurrentException;
import net.broadcast.chatting.domain.user.exception.PasswordIsWrongException;
import net.broadcast.chatting.domain.user.presentation.dto.response.SignInResponse;
import net.broadcast.chatting.global.properties.JwtProperty;
import net.broadcast.chatting.global.security.JwtProvider;
import net.broadcast.chatting.global.util.RedisUtil;

@Service
@RequiredArgsConstructor
public class UserService {

    final UserRepository userRepository;
    final PasswordEncoder passwordEncoder;
    final JwtProvider jwtProvider;
    final JwtProperty jwtProperty;
    
    public void signUp(
        String nickname,
        String accountId,
        String password,
        String role
    ) {
        if(userRepository.existsByAccountId(accountId)) {
            throw AlreadyNicknameExistException.EXCEPTION;
        }
        User user = User.builder()
            .nickname(nickname)
            .accountId(accountId)
            .password(passwordEncoder.encode(password))
            .userRole(UserRole.valueOf(role))
            .build();
        userRepository.save(user);
    }
    public SignInResponse signIn(
        String accountId,
        String password
    ) {
        User user = userRepository.findByAccountId(accountId).orElseThrow(() -> NoSuchUserException.EXCEPTION);
        if(!passwordEncoder.matches(password, user.getPassword())) {
            throw PasswordIsWrongException.EXCEPTION;
        }
        
        String subject = user.getNickname();
        String accessToken = jwtProvider.generateToken(subject, jwtProperty.getAccessExpirationMinutes());
        String refreshToken = jwtProvider.generateToken(subject, jwtProperty.getRefreshExpirationMinutes());
        
        RedisUtil.setString(
            user.getId().toString(),
            refreshToken,
            jwtProperty.getRefreshExpirationMinutes()
        );
        
        return SignInResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }
    public SignInResponse reissue(
        String refreshToken
    ) {
        if(!jwtProvider.parseClaims(refreshToken).get("typ", String.class).equals(JwtProperty.REFRESH)) {
            throw BadRequestTokenTypeException.EXCEPTION;
        }
        String subject = jwtProvider.parseClaims(refreshToken).getSubject();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String savedRefreshToken = RedisUtil.get(user.getId().toString());
        if(!refreshToken.equals(savedRefreshToken)) {
            throw DifferentTokenException.EXCEPTION;
        }
        
        String newAccessToken = jwtProvider.generateToken(subject, jwtProperty.getAccessExpirationMinutes());
        String newRefreshToken = jwtProvider.generateToken(subject, jwtProperty.getRefreshExpirationMinutes());
        
        RedisUtil.setString(
            user.getId().toString(),
            newRefreshToken,
            jwtProperty.getRefreshExpirationMinutes()
        );
        
        return SignInResponse.builder()
            .accessToken(newAccessToken)
            .refreshToken(newRefreshToken)
            .build();
    }

    public void logout() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String subject = userRepository.findByNickname(user.getUsername())
            .orElseThrow(() -> NoSuchUserException.EXCEPTION)
            .getId().toString();
        if(RedisUtil.get(subject) == null) throw NotLoginCurrentException.EXCPETION;
        RedisUtil.removeByKey(subject);
    }
}
