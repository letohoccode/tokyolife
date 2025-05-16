package com.example.shop_backend.controller;

import com.example.shop_backend.controllerService.OrderControllerService;
import com.example.shop_backend.request.OrderRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderControllerService orderControllerService;
    @GetMapping("/findOrderByUserId/{userId}")
    public ResponseEntity<?> findOrderByUserId(@PathVariable("userId")Long userId)
    {
        return ResponseEntity.ok(orderControllerService.findOrderByUserId(userId));
    }

    @PostMapping("/createOrder")
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderRequest request)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderControllerService.saveOrder(request));
    }
    @GetMapping("/search/{orderId}")
    public ResponseEntity<?> searchOrderById(@PathVariable("orderId")String orderId)
    {
        return ResponseEntity.ok(orderControllerService.findOrderByOrderId(orderId));
    }
}

