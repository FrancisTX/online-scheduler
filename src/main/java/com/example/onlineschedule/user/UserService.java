package com.example.onlineschedule.user;

import com.example.onlineschedule.exception.DuplicateResourceException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public void addUser(User user) {
        Boolean existsEmail = userRepository.selectExistsEmail(user.getEmail());
        if(existsEmail){
            throw new DuplicateResourceException("Email " + user.getEmail() + " taken");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Optional<User> selectUserByEmail(String email){
        return userRepository.selectUserByEmail(email);
    }
}
