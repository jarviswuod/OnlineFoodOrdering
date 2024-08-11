package com.jarvis.onlinefoodordering.controller;

import com.jarvis.onlinefoodordering.model.Order;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.request.OrderRequest;
import com.jarvis.onlinefoodordering.service.OrderService;
import com.jarvis.onlinefoodordering.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(
            @RequestBody OrderRequest req,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Order order = orderService.createOrder(req, user);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(
            @RequestBody OrderRequest req,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        List<Order> orders = orderService.getUSerOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
