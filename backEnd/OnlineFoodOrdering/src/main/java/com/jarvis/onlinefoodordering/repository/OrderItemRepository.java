package com.jarvis.onlinefoodordering.repository;

import com.jarvis.onlinefoodordering.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
