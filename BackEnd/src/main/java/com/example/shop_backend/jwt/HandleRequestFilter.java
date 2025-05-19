package com.example.shop_backend.jwt;

import com.example.shop_backend.response.DataResponse;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.time.Duration;
import java.util.Objects;

//@Component
@RequiredArgsConstructor
public class HandleRequestFilter implements Filter {
    private final RedisTemplate<String,Integer> redisTemplate;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        String UserIp = httpServletRequest.getRemoteAddr();

        if(redisTemplate.opsForValue().get(UserIp) == null)
        {
            redisTemplate.opsForValue().set(UserIp,1, Duration.ofSeconds(5));
        }
        int count = Objects.requireNonNullElse(redisTemplate.opsForValue().get(UserIp),0);
        if(count >= 5)
        {
            httpServletResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            httpServletResponse.getWriter().print(DataResponse.builder().message("Qua nhieu request ban bi cam trong 5s"));
            filterChain.doFilter(servletRequest,servletResponse);
            return;
        }else {
            redisTemplate.opsForValue().increment(UserIp);
        }

        filterChain.doFilter(servletRequest,servletResponse);
    }
}
