package com.example.shop_backend.controllerService;

import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.mapper.CartMapper;
import com.example.shop_backend.request.CartRequest;
import com.example.shop_backend.response.CartResponse;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.service.ProductService;
import com.example.shop_backend.serviceImpl.RedisServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartControllerService {
    private final ProductService productService;
    private final RedisServiceImpl<CartResponse> redisService;
    private final String KEY = "CART_USER:";
    public DataResponse<String> addProductToCart(CartRequest request) throws JsonProcessingException {
        CartResponse cartResponse = redisService.getRedisHashKeyClass(KEY + request.getUserId(), request.getProductId(),CartResponse.class);
        if(cartResponse != null)
        {
            int addQuantity = cartResponse.getQuantity() + request.getQuantity();
            cartResponse.setQuantity(addQuantity);
            redisService.saveRedisHashByKey(KEY + request.getUserId(), request.getProductId(), cartResponse);
            return DataResponse.<String>builder()
                    .message("cap nhat thanh cong")
                    .build();
        }
        ProductEntity productEntity =productService.findProductById(UUID.fromString(request.getProductId()));
        CartResponse saveCartResponse = CartMapper.cartResponse(request,productEntity);
        redisService.saveRedisHashByKey(KEY + request.getUserId(), request.getProductId(), saveCartResponse);
        redisService.setTimeToLive(KEY + request.getUserId(),10);
        return DataResponse.<String>builder()
                .message("cap nhat thanh cong")
                .build();
    }

    public DataResponse<List<CartResponse>> getAllCart(Long userId) throws JsonProcessingException {
        List<CartResponse> cartResponseList = redisService.getRedisHashAllKey(KEY + userId);
        if (cartResponseList.isEmpty())
            return DataResponse.<List<CartResponse>>builder()
                    .message("khong co san pham nao")
                    .build();
        return DataResponse.<List<CartResponse>>builder()
                .message("lay data thanh cong")
                .data(cartResponseList)
                .build();
    }

    public DataResponse<String> updateQuantityCart(Long userId, int quantity,String productId) throws JsonProcessingException {
        CartResponse cartResponse = redisService.getRedisHashKeyClass(KEY + userId,productId, CartResponse.class);
        log.info("cartResponse {}",cartResponse);
        if (cartResponse == null)
            return DataResponse.<String>builder().message("khong tim thay san pham").build();
        cartResponse.setQuantity(quantity);
        log.info("cartResponse {}",cartResponse);
        redisService.saveRedisHashByKey(KEY + userId,productId,cartResponse);
        return DataResponse.<String>builder().message("cap nhat thanh cong").build();
    }

    public DataResponse<String> deleteCartItem(Long userId, String productId) {
        redisService.deleteRedisHashByKey(KEY + userId,productId);
        return DataResponse.<String>builder().message("cap nhat thanh cong").build();
    }

    public DataResponse<String> deleteAllCart(Long userId, String productId) {
        redisService.deleteAllRedisHashKey(KEY + userId);
        return DataResponse.<String>builder().message("cap nhat thanh cong").build();
    }


}
