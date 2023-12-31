/* UserController.java */

package com.carboncalc.onrender.backend.controller;

import com.carboncalc.onrender.backend.model.User;
import com.carboncalc.onrender.backend.model.LoginDTO;
import com.carboncalc.onrender.backend.model.RegistrationDTO;
import com.carboncalc.onrender.backend.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody RegistrationDTO registration) {
        User user = new User();
        user.setUsername(registration.getUsername());
        user.setEmail(registration.getEmail());
        user.setFirstName(registration.getFirstName());
        user.setLastName(registration.getLastName());
        user.setTelephone(registration.getTelephone());
        user.setAddress(registration.getAddress());
        user.setCity(registration.getCity());
        user.setPostalCode(registration.getPostalCode());
        user.setCountry(registration.getCountry());

        user.hashAndSetPassword(registration.getPassword());

        User savedUser = userService.saveUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User created with ID: " + savedUser.getId());
        response.put("id", savedUser.getId());

        return ResponseEntity.ok(response);
    }

    private String generateSecureToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[64];

        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();
        User user = userService.findByUsername(username);

        if (user != null) {

            if (user.checkPassword(password)) {
                String sessionToken = generateSecureToken();

                user.setSessionToken(sessionToken);

                userService.saveUser(user);

                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("message", "Login successful");
                responseMap.put("username", username);

                // Set authToken cookie
                Cookie authTokenCookie = new Cookie("authToken", sessionToken);
                authTokenCookie.setMaxAge(3600);
                authTokenCookie.setPath("/"); // Site wide
                response.addCookie(authTokenCookie);

                Cookie usernameCookie = new Cookie("username", username);
                usernameCookie.setMaxAge(3600);
                usernameCookie.setPath("/"); // Site wide
                response.addCookie(usernameCookie);

                return ResponseEntity.ok(responseMap);
            } else {
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("message", "Login failed");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
            }
        } else {
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
        }
    }

    @GetMapping("/getUserIdByUsername")
    public ResponseEntity<Map<String, Object>> getUserIdByUsername(@RequestParam String username) {
        User user = userService.findByUsername(username);

        Map<String, Object> response = new HashMap<>();
        if (user != null) {
            response.put("userId", user.getId());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/logout")
    public void logout(HttpServletResponse response) {
        Cookie authTokenCookie = new Cookie("authToken", null);
        authTokenCookie.setMaxAge(0);
        authTokenCookie.setPath("/");
        response.addCookie(authTokenCookie);

        Cookie usernameCookie = new Cookie("username", null);
        usernameCookie.setMaxAge(0);
        usernameCookie.setPath("/");
        response.addCookie(usernameCookie);
    }
}