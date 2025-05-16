package com.example.shop_backend.jwt;

import com.example.shop_backend.serviceImpl.JwtServiceImpl;
import com.example.shop_backend.serviceImpl.UserDetailServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WebSocketTokenFilter implements ChannelInterceptor {
    private final JwtServiceImpl jwtService;
    private final UserDetailServiceImpl userDetailsService;

    @Override
    public Message<?> preSend(@NonNull Message<?> message,@NonNull MessageChannel channel) {

        final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        assert accessor != null;
        if (StompCommand.CONNECT == accessor.getCommand())
        {
            String jwt = jwtService.parseJWT(accessor);
            if(jwt != null && jwtService.validateJwtToken(jwt))
            {
                String username = jwtService.extractEmailToken(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                accessor.setUser(auth);
            }
        }

        return ChannelInterceptor.super.preSend(message, channel);
    }
}
