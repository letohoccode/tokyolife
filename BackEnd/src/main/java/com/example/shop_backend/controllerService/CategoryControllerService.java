package com.example.shop_backend.controllerService;

import com.example.shop_backend.request.CategoryRequest;
import com.example.shop_backend.response.CartResponse;
import com.example.shop_backend.response.CategoryResponse;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.serviceImpl.RedisServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryControllerService {
    private final RedisServiceImpl<CategoryResponse> redisService;
    private final String key = "category";

    public DataResponse<List<CategoryResponse >> getAllCategory() throws JsonProcessingException {
        List<CategoryResponse> listCategory = redisService.getRedisHashAllKey(key);
        return DataResponse.<List<CategoryResponse>>builder().message("lay data thanh cong").data(listCategory).build();
    }

    public DataResponse<String> createCategory(CategoryRequest category) throws JsonProcessingException {
        UUID uuid = UUID.randomUUID();
        CategoryResponse categoryResponse = new CategoryResponse(category.getCategory(), String.valueOf(uuid));
        redisService.saveRedisHashByKey(key, String.valueOf(uuid),categoryResponse);
        redisService.setTimeToLive(key,200);
        return DataResponse.<String>builder().message("tao thanh cong").build();
    }

    public DataResponse<String > deleteCategory(String category) {
        log.info("category {}",category);
        redisService.deleteRedisHashByKey(key,category);
        return DataResponse.<String>builder().message("xoa thanh cong").build();
    }
}
