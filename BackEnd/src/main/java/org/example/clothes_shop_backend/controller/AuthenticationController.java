package org.example.clothes_shop_backend.controller;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.clothes_shop_backend.request.AuthRequest;
import org.example.clothes_shop_backend.request.RegisterRequest;
import org.example.clothes_shop_backend.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterRequest request) throws MessagingException {
       return ResponseEntity.status(HttpStatus.CREATED)
               .body(
                      authenticationService.register(request)

               );
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid AuthRequest request)
    {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        authenticationService.authResponse(request)
                );
    }
    @GetMapping("/activate_account")
    public ResponseEntity<?> confirmAccount(@RequestParam String token) throws MessagingException {
        return  ResponseEntity.ok(authenticationService.activateAccount(token));
    }
}
