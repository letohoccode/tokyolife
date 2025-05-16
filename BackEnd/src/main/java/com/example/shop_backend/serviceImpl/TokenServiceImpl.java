package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.Token;
import com.example.shop_backend.repository.TokenRepository;
import com.example.shop_backend.service.TokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    private final TokenRepository tokenRepository;
    @Transactional
    @Override
    public Token saveToken(Token token) {


        return tokenRepository.save(token);
    }

    @Override
    public Token findTokenByToken(String token) {
        return tokenRepository.findTokenByToken(token).orElse(null);
    }


    @Transactional
    @Override
    public Token deleteToken(Long id) {
        return null;
    }


    @Override
    public Optional<Token> findTokenByUserId(Long id) {
        return tokenRepository.findById(id);
    }
}
