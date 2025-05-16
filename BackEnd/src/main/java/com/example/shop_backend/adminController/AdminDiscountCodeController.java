package com.example.shop_backend.adminController;

import com.example.shop_backend.controllerService.DiscountCodeControllerService;
import com.example.shop_backend.request.DiscountCodeRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/discountcode")
public class AdminDiscountCodeController {
    private final DiscountCodeControllerService discountCodeControllerService;

    public AdminDiscountCodeController(DiscountCodeControllerService discountCodeControllerService) {
        this.discountCodeControllerService = discountCodeControllerService;
    }

    @GetMapping
    public ResponseEntity<?> getAllDiscountCode() throws JsonProcessingException {
        return ResponseEntity.ok(discountCodeControllerService.getAllDiscountCode());
    }
    @PostMapping
    public  ResponseEntity<?> addDiscountCode(@RequestBody DiscountCodeRequest request) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.CREATED).body(discountCodeControllerService.saveDiscountCode(request));
    }
    @GetMapping("/{codeId}")
    public ResponseEntity<?> deleteDiscountCode(@PathVariable("codeId")String codeId)
    {
        return  ResponseEntity.status(HttpStatus.CREATED).body(discountCodeControllerService.deleteDiscountCode(codeId));
    }
    @GetMapping("/getCode/{codeId}")
    public ResponseEntity<?> getCodeByCodeId(@PathVariable("codeId")String codeId) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.OK).body(discountCodeControllerService.getCodeByCodeId(codeId));
    }
}
