package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.OrderItem;
import com.example.shop_backend.repository.OrderItemRepository;
import com.example.shop_backend.service.OrderItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {
    private final OrderItemRepository orderItemRepository;

    @Transactional
    @Override
    public OrderItem saveOrderItem(OrderItem OrderItem) {
        return orderItemRepository.save(OrderItem);
    }

    @Override
    public List<OrderItem> findAllOrderItemById() {
        return orderItemRepository.findAll();
    }

    @Override
    public List<OrderItem> findOrderItemByOrderId(UUID uuid) {
        return orderItemRepository.findOrderByOrderId(uuid);
    }

    @Override
    public OrderItem findOrderItemById(UUID id) {
        return orderItemRepository.findById(id).orElse(null);
    }
    @Transactional
    @Override
    public OrderItem updateOrderItem(OrderItem OrderItem) {
        return orderItemRepository.save(OrderItem);
    }

    @Transactional
    @Override
    public void deleteOrderItem(UUID id) {
        orderItemRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void saveListOrderItem(List<OrderItem> orderItems) {
        orderItemRepository.saveAll(orderItems);
    }
}
