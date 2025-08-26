package net.broadcast.chatting.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

@EnableWebSocketMessageBroker
@Configuration
public class WSBrockerConfig implements org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(org.springframework.web.socket.config.annotation.StompEndpointRegistry registry) {
        registry
            .addEndpoint("/chatting")
            .setAllowedOriginPatterns("*")
            .withSockJS(); // for SockJS
        registry
            .addEndpoint("/chatting")
            .setAllowedOriginPatterns("*"); // for WebSocket
    }

    @Override
    public void configureMessageBroker(org.springframework.messaging.simp.config.MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub"); // broker가 해당 prefix를 구독하는 client에게 메시지 전달
        registry.setApplicationDestinationPrefixes("/app"); // client가 메시지를 보낼 때 붙이는 prefix
    }
    
}
