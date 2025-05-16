package com.example.shop_backend.controller;

import com.example.shop_backend.modle.ChatMessage;
import com.example.shop_backend.serviceImpl.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api")
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/chat/sendMessage/{convId}")
    public ChatMessage sendMessageToConvId(@Payload ChatMessage chatMessage,
                                           @DestinationVariable("convId") Long convId
                                           )
    {
        chatService.sendMessageConvId(chatMessage,convId);
        return chatMessage;
    }
}
