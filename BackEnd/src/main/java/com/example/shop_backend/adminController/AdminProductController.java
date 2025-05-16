package com.example.shop_backend.adminController;

import com.example.shop_backend.controllerService.ProductControllerService;
import com.example.shop_backend.request.ProductRequest;
import com.example.shop_backend.request.ProductUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin/product")
@RequiredArgsConstructor
public class AdminProductController {
    private final ProductControllerService productControllerService;
    @PostMapping(value = "/createProduct")
    public ResponseEntity<?> createProduct( @RequestBody ProductRequest product
                                            ) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(productControllerService.saveProduct(product));
    }
    @PutMapping("/updateProduct")
    public ResponseEntity<?> updateProduct(@Valid @RequestBody ProductUpdateRequest request) throws IOException{
        return ResponseEntity.status(HttpStatus.CREATED).body(productControllerService.updateProduct(request));
    }
    @PutMapping("/updateImage")
    public ResponseEntity<?> updateImageProduct(@RequestParam("file")MultipartFile file,@RequestParam("productId")String productId) throws IOException {
        return ResponseEntity.ok(productControllerService.updateImageProductId(file,productId));
    }
    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable("productId")String productId)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(productControllerService.deleteProductById(productId));
    }
    @GetMapping("/updateFlashSale/{productId}")
    public ResponseEntity<?> updateFlashSale(@PathVariable("productId")String productId)
    {
        return ResponseEntity.ok(productControllerService.updateFlashSale(productId));
    }

}
