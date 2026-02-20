package com.campus.campus.controller;

import com.campus.campus.dto.UserUpdateRequest;
import com.campus.campus.entity.User;
import com.campus.campus.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable(name = "id") Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}/profile")
    public User updateProfile(@PathVariable(name = "id") Long id, @RequestBody UserUpdateRequest request) {
        return userService.updateProfile(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable(name = "id") Long id) {
        userService.deleteUser(id);
    }
}
