package com.jarvis.onlinefoodordering.service;

import com.jarvis.onlinefoodordering.config.JwtProvider;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public UserService(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromToken(jwt);

        return findUserByEmail(email);
    }

    private User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new Exception("User not found!");
        }
        return user;
    }
}
