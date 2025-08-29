package net.broadcast.chatting.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.global.properties.RedisProperty;

@EnableRedisRepositories
@RequiredArgsConstructor
@Configuration
public class RedisRepositoryConfig {
    final RedisProperty reidsProperty;

    @Bean
    RedisConnectionFactory redisConnectionFactory() {
        return new org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory(reidsProperty.getHost(), reidsProperty.getPort());
    }

    @Bean
    RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        return redisTemplate;
    }
}
