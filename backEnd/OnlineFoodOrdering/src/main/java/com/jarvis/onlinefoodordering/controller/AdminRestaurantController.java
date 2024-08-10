package com.jarvis.onlinefoodordering.controller;

import com.jarvis.onlinefoodordering.model.Restaurant;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.request.CreateRestaurantRequest;
import com.jarvis.onlinefoodordering.service.RestaurantService;
import com.jarvis.onlinefoodordering.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestaurantController {
    private final RestaurantService restaurantService;
    private final UserService userService;

    public AdminRestaurantController(RestaurantService restaurantService, UserService userService) {
        this.restaurantService = restaurantService;
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<Restaurant> addRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String token
    ) throws Exception {

        User user = userService.findUserByJwtToken(token);
        Restaurant restaurant = restaurantService.createRestaurant(req, user);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @RequestBody CreateRestaurantRequest req,
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        Restaurant restaurant = restaurantService.updateRestaurant(id, req);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        restaurantService.deleteRestaurant(id);
        return new ResponseEntity<>("Restaurant deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}
