package net.broadcast.chatting.global.properties;

import java.nio.charset.StandardCharsets;

import org.springframework.boot.context.properties.ConfigurationProperties;

import io.jsonwebtoken.io.Encoders;
import lombok.Getter;

@Getter
@ConfigurationProperties(prefix = "jwt")
public class JwtProperty {
    String secret;
    int accessExpirationMinutes;
    int refreshExpirationMinutes;
    String tokenPrefix;
    String headerString;
    String cookieString;

    public JwtProperty(
        String secret,
        int accessExpirationMinutes,
        int refreshExpirationMinutes,
        String tokenPrefix,
        String headerString,
        String cookieString
    ) {
        this.secret = Encoders.BASE64.encode(secret.getBytes(StandardCharsets.UTF_8));
        this.accessExpirationMinutes = accessExpirationMinutes;
        this.refreshExpirationMinutes = refreshExpirationMinutes;
        this.tokenPrefix = tokenPrefix;
        this.headerString = headerString;
        this.cookieString = cookieString;
    }
}
