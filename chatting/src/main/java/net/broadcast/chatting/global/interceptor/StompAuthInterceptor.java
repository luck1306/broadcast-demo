package net.broadcast.chatting.global.interceptor;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.global.security.JwtProvider;
import net.broadcast.chatting.global.util.SecurityUtil;

@RequiredArgsConstructor
@Component
public class StompAuthInterceptor implements ChannelInterceptor {

    final JwtProvider jwtProvider;
    final SecurityUtil securityUtil;
    final static Logger log = LoggerFactory.getLogger(StompAuthInterceptor.class);
    
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        // log.info("message={}, channel={}", message, channel);
        if (accessor != null) {
            StompCommand command = accessor.getCommand();
            if (StompCommand.CONNECT.equals(command)) {
                // Example: authenticate using headers
                String authToken = accessor.getFirstNativeHeader("Authorization");
                if (authToken != null && authToken.startsWith("Bearer ")) {
                    authToken = authToken.substring(7);
                    UUID userId = UUID.fromString(jwtProvider.parseClaims(authToken).getSubject());
                    Authentication authentication = securityUtil.generateAuthentication(userId);
                    accessor.setUser(authentication);
                }
                log.info("STOMP Connect: sessionId={}, token={}", accessor.getSessionId(), authToken);

                // TODO: validate token, throw exception if invalid
            } else if (StompCommand.SUBSCRIBE.equals(command)) {
                String destination = accessor.getDestination();
                log.info("STOMP Subscribe: sessionId={}, destination={}", accessor.getSessionId(), destination);

                // TODO: check if user has permission to subscribe
            } else if (StompCommand.SEND.equals(command)) {
                log.info("STOMP Send: sessionId={}, destination={}", accessor.getSessionId(), accessor.getDestination());
            } else if (StompCommand.DISCONNECT.equals(command)) {
                log.info("STOMP Disconnect: sessionId={}", accessor.getSessionId());
            }
        }
        return message;
    }

}
