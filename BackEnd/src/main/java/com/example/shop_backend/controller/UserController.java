package com.example.shop_backend.controller;

import com.example.shop_backend.controllerService.UserControllerService;
import com.example.shop_backend.request.AddressUserRequest;
import com.example.shop_backend.request.RegisterRequest;
import com.example.shop_backend.request.UserRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserControllerService userControllerService;

    @PutMapping("/updateAddress")
    public ResponseEntity<?>  updateAddressUser( @RequestBody AddressUserRequest request)
    {
        return ResponseEntity.ok(userControllerService.updateAddressUser(request));
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest request){
        return ResponseEntity.ok(userControllerService.updateUser(request));
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchUser(@RequestParam("name") String name)
    {
        return ResponseEntity.ok(userControllerService.SearchUser(name));
    }
    @GetMapping("/findUserById/{userId}")
    public ResponseEntity<?> findUserById(@PathVariable("userId") Long userId)
    {
        return ResponseEntity.ok(userControllerService.findUserById(userId));
    }
    @GetMapping("/getUserAndAddress")
    public ResponseEntity<?>  getUserAndAddress(@RequestParam("userId") Long userId){
        return ResponseEntity.ok(userControllerService.getUserAndAddress(userId));
    }

}
