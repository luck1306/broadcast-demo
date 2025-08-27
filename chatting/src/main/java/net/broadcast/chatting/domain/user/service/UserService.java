package net.broadcast.chatting.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.domain.user.domain.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    final UserRepository userRepository;
    final PasswordEncoder passwordEncoder;
    
    public void signUp(
        String nickname,
        String accountId,
        String password
    ) {
        if(userRepository.existsByAccountId(accountId)) {
            throw new IllegalArgumentException("Already Exists AccountId");
        }
        User user = User.builder()
            .nickname(nickname)
            .accountId(accountId)
            .password(passwordEncoder.encode(password))
            .build();
        userRepository.save(user);
    }
    public void signIn() {

    }
}
