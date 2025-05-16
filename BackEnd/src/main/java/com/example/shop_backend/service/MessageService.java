package com.example.shop_backend.service;

import com.example.shop_backend.entity.MessageEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageService {
    public List<MessageEntity> findAllByUsersMessage(Long id);

    public MessageEntity saveMessage(MessageEntity messageEntity);

}
