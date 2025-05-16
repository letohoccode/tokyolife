package com.example.shop_backend.adminController;

import com.example.shop_backend.controllerService.ProductControllerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/productSize")
@RequiredArgsConstructor
public class AdminProductSizeController {
    private final ProductControllerService productControllerService;

    @GetMapping("/updateQuantity/{sizeId}")
    public ResponseEntity<?> updateQuantity(@PathVariable("sizeId")String sizeID)
    {
        return ResponseEntity.status(HttpStatus.OK).body(productControllerService.updateQuantityProduct(sizeID));
    }
}
