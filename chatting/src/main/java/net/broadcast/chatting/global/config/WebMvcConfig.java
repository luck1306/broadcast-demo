package net.broadcast.chatting.global.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class WebMvcConfig implements org.springframework.web.servlet.config.annotation.WebMvcConfigurer {

    @Override
    public void addCorsMappings(
        org.springframework.web.servlet.config.annotation.CorsRegistry registry
    ) {
        registry.addMapping("/**")
            .allowedOriginPatterns("*")
            .allowedMethods("*")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
