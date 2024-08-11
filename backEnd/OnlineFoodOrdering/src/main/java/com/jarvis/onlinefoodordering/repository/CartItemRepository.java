package com.jarvis.onlinefoodordering.repository;

import com.jarvis.onlinefoodordering.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
