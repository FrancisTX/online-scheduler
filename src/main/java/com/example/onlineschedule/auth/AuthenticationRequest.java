package com.example.onlineschedule.auth;

public record AuthenticationRequest(
        String email,
        String password
) {
}
