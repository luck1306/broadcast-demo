package net.broadcast.chatting.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
// import org.springframework.security.messaging.web.socket.server.CsrfTokenHandshakeInterceptor;
// import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.global.interceptor.StompAuthInterceptor;

@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@Configuration
public class WSBrockerConfig implements org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer {
    final StompAuthInterceptor interceptor;

    @Override
    public void registerStompEndpoints(org.springframework.web.socket.config.annotation.StompEndpointRegistry registry) {
        registry
            .addEndpoint("/chatting")
            // .addInterceptors(new CsrfTokenHandshakeInterceptor()) // http 요청의 csrf token을 websocket 속성으로 사용하기 위한 interceptor
            // .addInterceptors(new HttpSessionHandshakeInterceptor())
            .setAllowedOriginPatterns("*")
            .withSockJS(); // for SockJS
        // registry
        //     .addEndpoint("/chatting")
        //     .setAllowedOriginPatterns("*"); // for WebSocket
    }

    @Override
    public void configureMessageBroker(org.springframework.messaging.simp.config.MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub"); // broker가 해당 prefix를 구독하는 client에게 메시지 전달
        registry.setApplicationDestinationPrefixes("/app"); // client가 메시지를 보낼 때 붙이는 prefix
    }
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(interceptor);
    }
}
