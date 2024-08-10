package com.jarvis.onlinefoodordering.controller;

import com.jarvis.onlinefoodordering.dto.RestaurantDto;
import com.jarvis.onlinefoodordering.model.Restaurant;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.service.RestaurantService;
import com.jarvis.onlinefoodordering.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    private final RestaurantService restaurantService;
    private final UserService userService;

    public RestaurantController(RestaurantService restaurantService, UserService userService) {
        this.restaurantService = restaurantService;
        this.userService = userService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(
            @RequestHeader("Authorization") String token,
            @RequestParam String keyword
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        List<Restaurant> restaurant = restaurantService.searchRestaurants(keyword);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurants(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        List<Restaurant> restaurant = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> findRestaurantById(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{id}/add-favourite")
    public ResponseEntity<RestaurantDto> addToFavourites(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        RestaurantDto restaurant = restaurantService.addToFavourites(id, user);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}
