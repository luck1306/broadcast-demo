package net.broadcast.chatting.global.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebMvcConfig implements org.springframework.web.servlet.config.annotation.WebMvcConfigurer {

    @Override
    public void addCorsMappings(
        org.springframework.web.servlet.config.annotation.CorsRegistry registry
    ) {
        registry.addMapping("/**")
            .allowedOriginPatterns("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
