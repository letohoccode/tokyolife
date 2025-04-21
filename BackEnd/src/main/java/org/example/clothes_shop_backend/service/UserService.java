package org.example.clothes_shop_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.clothes_shop_backend.model.User;
import org.example.clothes_shop_backend.repository.UserRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Cacheable(value = "product")
    public User findByEmail(String email)
    {
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user = new User();
        user = userOptional.orElse(null);
        return user;
    }
}
