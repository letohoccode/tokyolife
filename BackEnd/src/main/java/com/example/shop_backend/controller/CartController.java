package com.example.shop_backend.controller;

import com.example.shop_backend.controllerService.CartControllerService;
import com.example.shop_backend.controllerService.DiscountCodeControllerService;
import com.example.shop_backend.request.CartRequest;
import com.example.shop_backend.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartControllerService controllerService;
    private final DiscountCodeControllerService discountCodeControllerService;
    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.CREATED).body(controllerService.addProductToCart(request));
    }
    @GetMapping("/findAllCart")
    public ResponseEntity<?> getAllCart(@RequestParam("userId")Long userId) throws JsonProcessingException {
        return ResponseEntity.ok(controllerService.getAllCart(userId));
    }
    @GetMapping("/updateQuantity")
    public ResponseEntity<?> updateQuantityCart(@RequestParam("userId")Long userId,
                                                @RequestParam("quantity")int quantity,
                                                @RequestParam("productId")String productId) throws JsonProcessingException {
        return ResponseEntity.ok(controllerService.updateQuantityCart(userId,quantity,productId));
    }
    @GetMapping("/deleteCartItem")
    public ResponseEntity<?> deleteCartItem(@RequestParam("userId")Long userId,
                                            @RequestParam("productId")String productId){
        return ResponseEntity.ok(controllerService.deleteCartItem(userId,productId));
    }
    @GetMapping("/deleteAllCart")
    public ResponseEntity<?> deleteAllCart(@RequestParam("userId")Long userId,
                                           @RequestParam("productId")String productId)
    {
        return ResponseEntity.ok(controllerService.deleteAllCart(userId,productId));
    }
    @GetMapping("/discountCode/{discountCode}")
    public ResponseEntity<?> dicountCode(@PathVariable("discountCode")String discountCode) throws JsonProcessingException {
        return  ResponseEntity.ok(discountCodeControllerService.getCodeByCodeId(discountCode));
    }
}
