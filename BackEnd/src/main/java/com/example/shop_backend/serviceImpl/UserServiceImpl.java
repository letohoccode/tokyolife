package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.User;
import com.example.shop_backend.repository.UserRepository;
import com.example.shop_backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public User findById(Long id) {
       return  userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> findByAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> findUserByKeyword(String name) {
        return userRepository.findUserByKeyword(name);
    }


    @Transactional
    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void userBlock(boolean blockType,Long userId) {
        userRepository.updateBlockUser(blockType,userId);
    }

    @Override
    public List<User> findUserBlock() {
        return userRepository.findUserBlock();
    }

    @Override
    public User findUserByRole() {
        return userRepository.findUserByRole().orElse(null);
    }
}
