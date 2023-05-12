package com.example.onlineschedule.auth;

import com.example.onlineschedule.jwt.JWTUtil;
import com.example.onlineschedule.user.User;
import com.example.onlineschedule.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserService userService;

    public AuthenticationResponse login(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );
        Optional<User> user = userService.selectUserByEmail(request.email());
        if(user.isEmpty()){
            throw new IllegalStateException("User not found");
        }
        String token = jwtUtil.issueToken(user.get().getEmail(), "ROLE_USER");
        return new AuthenticationResponse(token);
    }

}
