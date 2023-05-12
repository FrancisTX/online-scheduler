package com.example.onlineschedule.user;

import com.example.onlineschedule.jwt.JWTUtil;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;
    private final JWTUtil jwtUtil;
    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @PostMapping
    public ResponseEntity<?> addUser(@Valid @RequestBody User user){
        userService.addUser(user);
        String jwtToken = jwtUtil.issueToken(user.getEmail(), "ROLE_USER");
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .build();
    }

    @GetMapping(path = "{userEmail}")
    public Optional<User> getUserByEmail(@PathVariable("userEmail") String userEmail){
        return userService.selectUserByEmail(userEmail);
    }
}
