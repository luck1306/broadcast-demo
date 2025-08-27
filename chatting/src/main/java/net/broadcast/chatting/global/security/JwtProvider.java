package net.broadcast.chatting.global.security;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import jakarta.annotation.PostConstruct;

public class JwtProvider {
    
    SecretKey secretKey;

    @PostConstruct
    void init() {
        secretKey = io.jsonwebtoken.security.Keys.hmacShaKeyFor(Decoders.BASE64.decode("bW9ja3NlY3JldGtleW1vY2tzZWNyZXRrZXltb2Nrc2VjcmV0a2V5"));
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
