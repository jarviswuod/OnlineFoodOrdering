package com.jarvis.onlinefoodordering.controller;

import com.jarvis.onlinefoodordering.model.Food;
import com.jarvis.onlinefoodordering.model.Restaurant;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.request.CreateFoodRequest;
import com.jarvis.onlinefoodordering.service.FoodService;
import com.jarvis.onlinefoodordering.service.RestaurantService;
import com.jarvis.onlinefoodordering.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {
    private final FoodService foodService;
    private final UserService userService;
    private final RestaurantService restaurantService;

    public AdminFoodController(FoodService foodService, UserService userService, RestaurantService restaurantService) {
        this.foodService = foodService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    @PostMapping
    public ResponseEntity<Food> addFood(
            @RequestBody CreateFoodRequest req,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req, req.getCategory(), restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFood(
            @PathVariable long id,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        foodService.deleteFood(id);
        return new ResponseEntity<>("Food deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailability(
            @PathVariable long id,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        Food food = foodService.updateAvailability(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }

}
