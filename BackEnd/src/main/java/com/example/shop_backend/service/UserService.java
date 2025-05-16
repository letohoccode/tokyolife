package com.example.shop_backend.service;

import com.example.shop_backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public User saveUser(User user);
    public User findByEmail(String email);
    public User findById(Long id);
    public List<User> findByAll();
    public List<User> findUserByKeyword(String name);
    public void updateUser(User user);
    public void deleteUser(Long id);
    public void userBlock(boolean blockType,Long userId);
    public List<User> findUserBlock();
    public User findUserByRole();
}
