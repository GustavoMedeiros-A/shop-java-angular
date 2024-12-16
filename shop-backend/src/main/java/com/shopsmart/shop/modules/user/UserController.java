package com.shopsmart.shop.modules.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopsmart.shop.modules.user.dto.CreateUserDTO;
import com.shopsmart.shop.modules.user.dto.JwtResponse;
import com.shopsmart.shop.modules.user.dto.LoginRequestDTO;
import com.shopsmart.shop.modules.user.dto.UserResponseDTO;
import com.shopsmart.shop.utils.ApiResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping()
public class UserController {

    private final UserService userService;

    private UserController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/all")
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public UserResponseDTO getUserById(@PathVariable("id") final Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody final @Valid CreateUserDTO user) {
        userService.registerUser(user);
        return ResponseEntity.ok(new ApiResponse("User created successfully"));
    }

    @PostMapping("/auth/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody final @Valid LoginRequestDTO loginRequest) {
        final String token = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(new JwtResponse(token));
    }



}
