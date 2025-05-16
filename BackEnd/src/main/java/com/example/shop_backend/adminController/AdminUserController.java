package com.example.shop_backend.adminController;

import com.example.shop_backend.controllerService.UserControllerService;
import com.example.shop_backend.request.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/user")
@RequiredArgsConstructor
public class AdminUserController {
    private final UserControllerService userControllerService;
    @GetMapping("/blockUser")
    public ResponseEntity<?> blockUser(@RequestParam("userId")Long userId)
    {
        return ResponseEntity.ok(userControllerService.blockUserId(userId));
    }
    @GetMapping("/findUserBlock")
    public ResponseEntity<?> findUserBlock()
    {
        return ResponseEntity.ok(userControllerService.findUserBlock());
    }
    @PostMapping
    public ResponseEntity<?> saveUserManager(@Valid @RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(userControllerService.saveUserManager(request));
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchUser(@RequestParam("name") String name)
    {
        return ResponseEntity.ok(userControllerService.SearchUser(name));
    }
}
