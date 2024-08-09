package com.jarvis.onlinefoodordering.repository;

import com.jarvis.onlinefoodordering.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
}
