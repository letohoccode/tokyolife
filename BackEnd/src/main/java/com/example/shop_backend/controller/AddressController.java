package com.example.shop_backend.controller;

import com.example.shop_backend.controllerService.AddressControllerService;
import com.example.shop_backend.request.AddressRequest;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/address")
public class AddressController {
    private final AddressControllerService addressControllerService;

    @Operation(summary = "Find Address By Id")
    @GetMapping("/findAddressById/{addressId}")
    public ResponseEntity<?> findAddressByUser(@PathVariable("addressId")Long addressId)
    {
        return ResponseEntity.ok(addressControllerService.findAddressById(addressId));
    }


}
