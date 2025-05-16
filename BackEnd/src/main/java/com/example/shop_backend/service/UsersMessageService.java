package com.example.shop_backend.service;

import com.example.shop_backend.entity.UsersMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UsersMessageService {
    public List<UsersMessage> findAllByUserId(Long id);

    public UsersMessage saveUsersMessage(UsersMessage usersMessage);

    public UsersMessage findUsersMessage(Long id);
}
