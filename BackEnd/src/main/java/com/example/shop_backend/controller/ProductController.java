package com.example.shop_backend.controller;

import com.example.shop_backend.controllerService.ProductControllerService;
import com.example.shop_backend.request.ProductStatusRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
    private final ProductControllerService productControllerService;

    @GetMapping("/findAllProduct")
    public ResponseEntity<?> findAllProduct(@RequestParam(name = "page", defaultValue = "0", required = false)int page,
                                            @RequestParam(name = "size",defaultValue = "10",required = false)int size)
    {
        return ResponseEntity.ok(productControllerService.findAllProduct(page,size));
    }

    @GetMapping("/findProductById/{productId}")
    public ResponseEntity<?> findProductById(@PathVariable("productId")String productId)
    {
        return ResponseEntity.ok(productControllerService.findProductById(productId));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProduct(@RequestParam("keyword")String keyword)
    {
        return ResponseEntity.ok(productControllerService.SearchProduct(keyword));
    }
    @GetMapping("/findProductByCategory")
    public ResponseEntity<?> findProductByCategory(
            @RequestParam(name = "category",required = false)String category,
            @RequestParam(name = "page",defaultValue = "0",required = false)int page,
            @RequestParam(name = "size",defaultValue = "10",required = false)int size,
            @RequestParam(name = "sort",required = false)String sort,
            @RequestParam(name = "sortType",required = false)String sortType,
            @RequestParam(name = "status",required = false) boolean status
    )
    {
        return ResponseEntity.ok(productControllerService.findProductByCategory(page,size,status,category,sort,sortType));
    }
    @GetMapping("/findProductFlashSale")
    public ResponseEntity<?> findProductFlashSale(@RequestParam(name = "page",defaultValue = "0",required = false)int page,
                                                  @RequestParam(name = "size",defaultValue = "10",required = false)int size,
                                                  @RequestParam(name = "status",defaultValue = "true",required = false)boolean status)
    {
        return ResponseEntity.ok(productControllerService.findProductFlashSale(page,size,status));
    }
}
