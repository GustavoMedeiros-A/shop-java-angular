package com.shopsmart.shop.modules.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shopsmart.shop.configuration.JwtUtils;
import com.shopsmart.shop.configuration.SecurityConfig;
import com.shopsmart.shop.modules.user.dto.CreateUserDTO;
import com.shopsmart.shop.modules.user.dto.LoginRequestDTO;
import com.shopsmart.shop.modules.user.dto.UserResponseDTO;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SecurityConfig securityConfig;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UserService(
            final UserRepository userRepository,
            final SecurityConfig securityConfig,
            final PasswordEncoder passwordEncoder,
           final JwtUtils jwtUtils
    ) {
        this.userRepository = userRepository;
        this.securityConfig = securityConfig;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public UserResponseDTO getUserById(final Long id) {
        final User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return UserResponseDTO.
                builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public List<UserResponseDTO> getAllUsers() {
        final List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> UserResponseDTO.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .createdAt(user.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public void registerUser(final CreateUserDTO createUserDTO) {

        if(!createUserDTO.getPassword().equals(createUserDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("Password doens't match");
        }

        if(userRepository.findByEmail(createUserDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User already created with this email");
        }
        final User user = User.builder()
                .username(createUserDTO.getUsername())
                .email(createUserDTO.getEmail())
                .password(securityConfig.passwordEncoder().encode(createUserDTO.getPassword()))
                .build();

        userRepository.save(user);
    }

    public String authenticateUser(final LoginRequestDTO loginRequest) {
        final User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));


        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }
        return jwtUtils.generateToken(user.getUsername());
    }

}
