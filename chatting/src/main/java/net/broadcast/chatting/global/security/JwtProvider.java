package net.broadcast.chatting.global.security;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.io.Decoders;
import jakarta.annotation.PostConstruct;

@Component
public class JwtProvider {
    
    SecretKey secretKey;

    @PostConstruct
    void init() {
        secretKey = io.jsonwebtoken.security.Keys.hmacShaKeyFor(Decoders.BASE64.decode("bW9ja3NlY3JldGtleW1vY2tzZWNyZXRrZXltb2Nrc2VjcmV0a2V5"));
    }
}
