package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.User;
import com.example.shop_backend.modle.ChatMessage;
import com.example.shop_backend.service.UserService;
import com.example.shop_backend.utilsEnum.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableAsync
public class OnlineAndOffline {

    private final UserService userService;
    private final Set<Long> subscribedOnlineOffline = new HashSet<>();
    private final Map<Long,Set<String>> subscribed = new HashMap<>();
    private final SimpMessageSendingOperations simpMessageSendingOperations;


    @Async
    public void addSubscribed(String subscribedChannel, String name) {
        User user = userService.findByEmail(name);
        if (user == null) return;
        log.info("{} subscribed to {}", user.getUsername(), subscribedChannel);
        Set<String> subscription = subscribed.getOrDefault(user.getId(),null);
        subscription.add(subscribedChannel);
        subscribed.put(user.getId(), subscription);
    }

    @Async
    public void UnSubscribed(String unSubscribed, String name) {
        User user = userService.findByEmail(name);
        if (user == null) return;
        log.info("{} unSubscribed to {}", user.getUsername(), unSubscribed);
        Set<String> unSubscription = subscribed.getOrDefault(user.getId(),null);
        unSubscription.remove(unSubscribed);
        subscribed.put(user.getId(), unSubscription);
    }

    @Async
    public void AddUserConnect(String name) {
        User user = userService.findByEmail(name);
        if (user == null) return;
        log.info(" {} da ket noi ",name);
        subscribedOnlineOffline.add(user.getId());
        for(Long userId : subscribedOnlineOffline)
        {
            simpMessageSendingOperations.convertAndSend(
                    "/app/" + userId,
                    ChatMessage.builder()
                            .messageType(MessageType.FRIEND_ONLINE)
                            .senderId(userId).build()
            );
            try{
                Thread.sleep(200);
            }catch (InterruptedException e){
                log.info("Sleep error: {}",e.getMessage());
            }
        }
    }
    @Async
    public void RemoveUserConnect(String name)
    {
        User user =userService.findByEmail(name);
        if (user == null) return;
        log.info(" {} Ngat ket noi ",name);
        subscribedOnlineOffline.remove(user.getId());
        for(Long userId : subscribedOnlineOffline)
        {
            simpMessageSendingOperations.convertAndSend(
                    "/app/" + userId,
                    ChatMessage.builder()
                            .messageType(MessageType.FRIEND_ONLINE)
                            .senderId(userId).build()
            );
            try{
                Thread.sleep(200);
            }catch (InterruptedException e){
                log.info("Sleep error : {}",e.getMessage());
            }
        }
    }
    public boolean isUserOnline(Long userId)
    {
        return subscribedOnlineOffline.contains(userId);
    }

    public boolean isUserSubscribed(Long userId,String subscription)
    {
        Set<String> strings = subscribed.getOrDefault(userId,null);
        return strings.contains(subscription);
    }
}
