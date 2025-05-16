package com.example.shop_backend.controller;


import com.example.shop_backend.controllerService.ImageControllerService;
import com.example.shop_backend.response.DataResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
@Slf4j
public class ImageController {
    private final ImageControllerService imageControllerService;

    @PostMapping("/uploadList")
    public ResponseEntity<?> uploadListImage(@RequestParam("files")MultipartFile[] fileList) throws IOException {
        log.info("uploadListImage",fileList.length);
        try {
            List<String> imageUrls = imageControllerService.uploadListImage(fileList);
            return ResponseEntity.ok(DataResponse.builder().data(imageUrls).build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Could not upload files: " + e.getMessage()));
        }

    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadSingleImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(
                    DataResponse.builder()
                            .message("File không được để trống")
                            .build()
            );
        }
        String imagePath = imageControllerService.uploadImages(file);
        var responseData = DataResponse.builder()
                .data(imagePath)
                .message("Upload thành công")
                .build();
        return ResponseEntity.ok(responseData);
    }
}
