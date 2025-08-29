package net.broadcast.chatting.global.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@ConfigurationProperties(prefix = "spring.data.redis")
@AllArgsConstructor
public class RedisProperty {
    String host;
    int port;
}
