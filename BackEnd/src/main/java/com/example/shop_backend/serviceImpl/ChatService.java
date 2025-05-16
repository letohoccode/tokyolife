package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.MessageEntity;
import com.example.shop_backend.modle.ChatMessage;
import com.example.shop_backend.utilsEnum.MessageTypeStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final OnlineAndOffline onlineAndOffline;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    public void sendMessageConvId(ChatMessage chatMessage, Long convId) {

        boolean isTargetOnline = onlineAndOffline.isUserOnline(chatMessage.getReceiverId());
        boolean isTargetSubscribed = onlineAndOffline.isUserSubscribed(chatMessage.getReceiverId(),"/app/" + convId.toString());
        var messageEntity = MessageEntity.builder()
                .convId(convId)
                .content(chatMessage.getContent())
                .images(chatMessage.getImages())
                .senderId(chatMessage.getSenderId())
                .receiverId(chatMessage.getReceiverId());
        if (!isTargetOnline)
        {
            messageEntity.status(MessageTypeStatus.NOT_DELIVERED.toString());
            chatMessage.setMessageTypeStatus(MessageTypeStatus.NOT_DELIVERED);

        }else if(!isTargetSubscribed){
            messageEntity.status(MessageTypeStatus.DELIVERED.toString());
            chatMessage.setMessageTypeStatus(MessageTypeStatus.DELIVERED);
            simpMessageSendingOperations.convertAndSend("/app/" + chatMessage.getSenderId().toString(),chatMessage);
        }else{
            messageEntity.status(MessageTypeStatus.SEEN.toString());
            chatMessage.setMessageTypeStatus(MessageTypeStatus.SEEN);
        }

    }
}
