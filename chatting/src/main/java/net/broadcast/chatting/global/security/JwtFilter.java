package net.broadcast.chatting.global.security;

import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    final JwtProvider provider;

    @Override
    protected void doFilterInternal(
        jakarta.servlet.http.HttpServletRequest request,
        jakarta.servlet.http.HttpServletResponse response, 
        jakarta.servlet.FilterChain filterChain
    )
        throws java.io.IOException, jakarta.servlet.ServletException 
    {
        String token = getTokenBody(request);
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
