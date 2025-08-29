package net.broadcast.chatting.global.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.global.properties.JwtProperty;

@RequiredArgsConstructor
@Component
public class JwtProvider {
    
    SecretKey secretKey;
    final JwtProperty jwtProperty;

    @PostConstruct
    void init() {
        secretKey = io.jsonwebtoken.security.Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtProperty.getSecret()));
    }

    public String generateToken(String subject, long expire) {
        return io.jsonwebtoken.Jwts.builder()
            .subject(subject)
            .signWith(secretKey)
            .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * expire)) // 1m * expire(minute)
            .claim("typ", expire <= 30 ? "access" : "refresh")
            .compact();
    }

    public Claims parseClaims(String token) {
        return io.jsonwebtoken.Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
}
