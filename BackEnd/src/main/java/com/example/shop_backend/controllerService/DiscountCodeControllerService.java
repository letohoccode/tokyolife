package com.example.shop_backend.controllerService;

import com.example.shop_backend.request.DiscountCodeRequest;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.response.DiscountResponse;
import com.example.shop_backend.serviceImpl.RedisServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class DiscountCodeControllerService {
    private final RedisServiceImpl<DiscountResponse> redisService;
    private final ObjectMapper objectMapper;
    private final RedisTemplate<String,Object> redisTemplate;
    private final String KEY = "discountCode:";

    public DiscountCodeControllerService(RedisServiceImpl<DiscountResponse> redisService, ObjectMapper objectMapper, RedisTemplate<String, Object> redisTemplate) {
        this.redisService = redisService;
        this.objectMapper = objectMapper;
        this.redisTemplate = redisTemplate;
    }

    public DataResponse<List<DiscountResponse>> getAllDiscountCode() throws JsonProcessingException {
        List<DiscountResponse> discountCodeResponseList = redisService.getAllByHeard(KEY);

        return DataResponse.<List<DiscountResponse>>builder()
                .message("lay data thanh cong")
                .data(discountCodeResponseList)
                .build();
    }
    public DataResponse<String> saveDiscountCode(DiscountCodeRequest request) throws JsonProcessingException {
        DiscountResponse codeResponse = new DiscountResponse();
        codeResponse.setCode(request.getCode());
        codeResponse.setRate(request.getRate());
        codeResponse.setFirstDate(LocalDate.now());
        codeResponse.setLastDate(LocalDate.now().plusDays(request.getDate()));
        redisService.saveRedisByKey(KEY + request.getCode(),codeResponse,request.getDate());
        return DataResponse.<String>builder().message("luu thanh cong").build();
    }

    public DataResponse<String> deleteDiscountCode(String codeId) {
        redisService.deleteRedisByKey(KEY + codeId);
        return DataResponse.<String>builder().message("xoa thanh cong").build();
    }

    public DataResponse<DiscountResponse> getCodeByCodeId(String codeId) throws JsonProcessingException {
        log.info("getCodeByCodeId "+codeId);
        DiscountResponse codeResponse = redisService.getRedisByKey(KEY + codeId,DiscountResponse.class);
        if (codeResponse == null)
            return DataResponse.<DiscountResponse>builder().message("Không Có Mã giảm Giá Nào").build();
        if(codeResponse.getLastDate().isBefore(LocalDate.now()))
        {
            return DataResponse.<DiscountResponse>builder().message("Mã giảm Giá đã hết hạn").build();
        }
        return DataResponse.<DiscountResponse>builder().message("lay data thanh cong")
                .data(codeResponse)
                .build();
    }
}
