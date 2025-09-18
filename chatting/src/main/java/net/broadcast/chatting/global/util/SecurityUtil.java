package net.broadcast.chatting.global.util;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.domain.user.domain.repository.UserRepository;
import net.broadcast.chatting.domain.user.exception.NoSuchUserException;

@Getter
@Component
@RequiredArgsConstructor
public class SecurityUtil {

    final UserRepository userRepository;
    
    public Authentication generateAuthentication(String nickname) {
        User pricinpal = userRepository.findByNickname(nickname)
            .orElseThrow(() -> NoSuchUserException.EXCEPTION);
        return new UsernamePasswordAuthenticationToken(
            (UserDetails) pricinpal, 
            null, 
            pricinpal.getAuthorities()
        );
    }
    
}
