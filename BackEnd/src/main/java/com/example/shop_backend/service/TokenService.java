package com.example.shop_backend.service;

import com.example.shop_backend.entity.Token;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface TokenService {
    public Token saveToken(Token token);
    public Token findTokenByToken(String token);
    public Token deleteToken(Long id);
    public Optional<Token> findTokenByUserId(Long id);
}
