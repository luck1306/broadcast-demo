package net.broadcast.chatting.global.security;

import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.global.util.SecurityUtil;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    final JwtProvider provider;
    final SecurityUtil securityUtil;

    @Override
    protected void doFilterInternal(
        jakarta.servlet.http.HttpServletRequest request,
        jakarta.servlet.http.HttpServletResponse response, 
        jakarta.servlet.FilterChain filterChain
    )
        throws java.io.IOException, jakarta.servlet.ServletException 
    {
        String token = getTokenBody(request);
        if (token != null) {
            UUID userId = UUID.fromString(provider.parseClaims(token).getSubject());
            Authentication authentication = securityUtil.generateAuthentication(userId);
            org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    static String getTokenBody(jakarta.servlet.http.HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        return token.substring(7);
    }
    
}
