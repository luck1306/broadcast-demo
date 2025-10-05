package net.broadcast.chatting.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
// import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.global.security.JwtFilter;
import net.broadcast.chatting.global.security.JwtProvider;
import net.broadcast.chatting.global.util.SecurityUtil;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    final JwtProvider provider;
    final SecurityUtil util;

    @Bean
    PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // XorCsrfTokenRequestAttributeHandler requestHandler = new XorCsrfTokenRequestAttributeHandler(); // BREACH 보호용 기본 핸들러. 요청에서 마스킹값을 복원함.
        // requestHandler.setCsrfRequestAttributeName("_csrf");

        return http.httpBasic(AbstractHttpConfigurer::disable)
                // .csrf(csrf -> csrf
                //     .ignoringRequestMatchers("/users/sign**") // 로그인 / 회원가입 csrf 검증 제외
                //     .ignoringRequestMatchers("/chatting/**")
                //     .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // 쿠키에 csrf 토큰을 넣어 js에서 읽을 수 있게 함
                //     .csrfTokenRequestHandler(requestHandler)
                // )
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // CORS Pre-Flight
                    // STOMP HandShake
                    .requestMatchers("/chatting/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/chats/{channelName}").authenticated()

                    // "/users"
                    .requestMatchers(HttpMethod.POST, "/users/signup").permitAll()
                    .requestMatchers(HttpMethod.POST, "/users/signin").permitAll()
                    .requestMatchers(HttpMethod.PUT, "/users/reissue").authenticated()
                    .requestMatchers(HttpMethod.DELETE,"/users/logout").authenticated()

                    // "/channels"
                    .requestMatchers(HttpMethod.GET, "/channels/all").authenticated()
                    .requestMatchers(HttpMethod.GET, "/channels/onair").authenticated()
                    .requestMatchers(HttpMethod.GET, "/channels/search").authenticated()
                    .requestMatchers(HttpMethod.GET, "/channels/info").authenticated()
                    .requestMatchers(HttpMethod.POST, "/channels/create").authenticated()
                    .requestMatchers(HttpMethod.PUT, "/channels/stream").authenticated()

                    .anyRequest().denyAll()
                )
                .addFilterBefore(new JwtFilter(provider, util), org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
