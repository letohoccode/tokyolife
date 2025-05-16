package com.example.shop_backend.config;

import com.example.shop_backend.serviceImpl.OnlineAndOffline;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class WebSocketEvenListener {

    private final Map<String,String> subscribed =new HashMap<>();
    private final OnlineAndOffline onlineAndOffline;

    @EventListener
    public void handleConnectEvent(SessionConnectedEvent connectedEvent)
    {
        onlineAndOffline.AddUserConnect(Objects.requireNonNull(connectedEvent.getUser()).getName());

    }
    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent disconnectEvent)
    {

    }
    @EventListener
    public void handleSubscribed(SessionSubscribeEvent subscribeEvent)
    {
        String subscribedChannel = (String) subscribeEvent.getMessage().getHeaders().get("simpDestination");
        String simpleSession = (String) subscribeEvent.getMessage().getHeaders().get("simpSessionId");
        if(subscribedChannel == null) return;
        subscribed.put(simpleSession,subscribedChannel);
        onlineAndOffline.addSubscribed(subscribedChannel, Objects.requireNonNull(subscribeEvent.getUser()).getName());
    }
    @EventListener
    public void handleUnSubscribed(SessionUnsubscribeEvent unsubscribeEvent)
    {
        String simpleSession = (String) unsubscribeEvent.getMessage().getHeaders().get("simpSessionId");
        String unSubscribed = subscribed.get(simpleSession);
        onlineAndOffline.UnSubscribed(unSubscribed, Objects.requireNonNull(unsubscribeEvent.getUser()).getName());

    }
}
