package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.UsersMessage;
import com.example.shop_backend.repository.UsersMessageRepository;
import com.example.shop_backend.service.UsersMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersMessageServiceImpl implements UsersMessageService {
    private final UsersMessageRepository usersMessageRepository;
    @Override
    public List<UsersMessage> findAllByUserId(Long id) {
        return usersMessageRepository.findUserMessageByUserId(id);
    }

    @Override
    public UsersMessage saveUsersMessage(UsersMessage usersMessage) {
        return usersMessageRepository.save(usersMessage);
    }

    @Override
    public UsersMessage findUsersMessage(Long id) {
        return usersMessageRepository.findById(id).orElse(null);
    }
}
