package net.broadcast.chatting.global.util;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisUtil {
    static RedisTemplate<String, Object> redisTemplate;

    public static void setString(
        String key,
        String value,
        long duration
    ) {
        redisTemplate.opsForValue().set(key, value);
        redisTemplate.expire(key, duration, java.util.concurrent.TimeUnit.MINUTES);
    }

    public static String get(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    RedisUtil(RedisTemplate<String, Object> redisTemplate) {
        RedisUtil.redisTemplate = redisTemplate;
    }

    public static void removeByKey(String key) {
        redisTemplate.delete(key);
    }
}
