package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.MessageEntity;
import com.example.shop_backend.repository.MessageRepository;
import com.example.shop_backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;

    @Override
    public List<MessageEntity> findAllByUsersMessage(Long id) {
        return messageRepository.findAllByUsersMessageId(id);
    }

    @Override
    public MessageEntity saveMessage(MessageEntity messageEntity) {
        return messageRepository.save(messageEntity);
    }
}
