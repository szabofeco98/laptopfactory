package com.thesis.factory.config.security;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;


public class JwtFilter extends OncePerRequestFilter {
    private  JwtTokenProvider jwtTokenProvider;

    public JwtFilter(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider=jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtTokenProvider.resolveToken(request);
        System.out.println("FILTER");
        List header = Collections.list(request.getHeaderNames());
        header.forEach(o -> {
            System.out.println(o+ ": " + request.getHeader(o.toString()));
        });


        try {
            System.out.println("try");
            System.out.println(token);
            System.out.println(request.getHeaders("Authorization"));
            if(token !=null && jwtTokenProvider.validateToken(token)){
                System.out.println("validminden");
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                System.out.println(auth);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }catch (Exception e){
            SecurityContextHolder.clearContext();
            response.sendError(500,e.getMessage());
            return;
        }

        filterChain.doFilter(request,response);
    }
}
