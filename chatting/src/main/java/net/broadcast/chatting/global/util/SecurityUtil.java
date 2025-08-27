package net.broadcast.chatting.global.util;

import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.domain.user.domain.repository.UserRepository;

@Getter
@Component
@RequiredArgsConstructor
public class SecurityUtil {

    final UserRepository userRepository;
    
    public Authentication generateAuthentication(UUID userid) {
        User pricinpal = userRepository.findById(userid)
            .orElseThrow(() -> new IllegalArgumentException("No User"));
        return new UsernamePasswordAuthenticationToken(
            (UserDetails) pricinpal, 
            null, 
            pricinpal.getAuthorities()
        );
    }
    
}
