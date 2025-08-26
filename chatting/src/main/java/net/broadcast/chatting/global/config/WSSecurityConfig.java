package net.broadcast.chatting.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;

@EnableWebSocketSecurity
@Configuration
public class WSSecurityConfig {

    @Bean
    AuthorizationManager<Message<?>> authorizationManager(MessageMatcherDelegatingAuthorizationManager.Builder messages) {
        return messages
            .nullDestMatcher().permitAll() // nullDestMatcher: destination이 null인 경우
            .simpDestMatchers("/app/**").permitAll() // 클라이언트가 메시지를 보낼 때 붙이는 prefix
            .simpSubscribeDestMatchers("/sub/**").permitAll() // broker가 해당 prefix를
            .anyMessage().denyAll()
            .build();
    }
}
