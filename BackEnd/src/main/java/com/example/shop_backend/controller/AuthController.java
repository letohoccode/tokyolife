package com.example.shop_backend.controller;

import com.example.shop_backend.controllerService.AuthControllerService;
import com.example.shop_backend.request.AuthRequest;
import com.example.shop_backend.request.ChangePasswordRequest;
import com.example.shop_backend.request.RegisterRequest;
import com.example.shop_backend.response.AuthResponse;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.response.RegisterResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthControllerService authControllerService;
    @PostMapping("/login")
    public ResponseEntity<DataResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request)
    {

        return ResponseEntity.ok(authControllerService.AuthenticationResponse(request));
    }

    @PostMapping("/register")
    public ResponseEntity<DataResponse<RegisterResponse>> register(@Valid @RequestBody RegisterRequest request) throws MessagingException {


        return ResponseEntity.ok(authControllerService.RegisterResponse(request));
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<?> confirmAccount(@RequestParam(name = "token") String token) throws Exception {

        return ResponseEntity.ok(authControllerService.confirmAccount(token));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request) throws MessagingException {
        return ResponseEntity.ok(authControllerService.ChangePassword(request));

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout()
    {
        return ResponseEntity.ok("dang xuat thanh cong");
    }
}
