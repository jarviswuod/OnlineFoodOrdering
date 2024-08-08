package com.jarvis.onlinefoodordering.repository;

import com.jarvis.onlinefoodordering.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
