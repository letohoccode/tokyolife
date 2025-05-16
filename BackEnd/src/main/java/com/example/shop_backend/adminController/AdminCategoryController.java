package com.example.shop_backend.adminController;

import com.example.shop_backend.controllerService.CategoryControllerService;
import com.example.shop_backend.request.CategoryRequest;
import com.example.shop_backend.response.CategoryResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/category")
@RequiredArgsConstructor
public class AdminCategoryController {
    private final CategoryControllerService categoryControllerService;

    @GetMapping("")
    public ResponseEntity<?> getAllCategory() throws JsonProcessingException {
        return ResponseEntity.ok(categoryControllerService.getAllCategory());
    }
    @PostMapping("")
    public ResponseEntity<?> addCategory(@RequestBody CategoryRequest category) throws JsonProcessingException {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryControllerService.createCategory(category));
    }
    @GetMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId")String category)
    {
        return ResponseEntity.status(HttpStatus.OK).body(categoryControllerService.deleteCategory(category));
    }
}
