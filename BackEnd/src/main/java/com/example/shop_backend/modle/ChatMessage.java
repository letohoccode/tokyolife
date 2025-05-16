package com.example.shop_backend.modle;

import com.example.shop_backend.utilsEnum.MessageType;
import com.example.shop_backend.utilsEnum.MessageTypeStatus;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private Long senderId;
    private String senderUserName;

    private String content;
    private String images;

    private Long receiverId;
    private String receiverUserName;

    private MessageType messageType;
    private MessageTypeStatus messageTypeStatus;
}
