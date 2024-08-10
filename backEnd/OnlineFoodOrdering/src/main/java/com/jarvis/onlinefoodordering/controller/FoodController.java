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

import java.util.List;


@RestController
@RequestMapping("/api/food")
public class FoodController {
    private final FoodService foodService;
    private final UserService userService;
    private final RestaurantService restaurantService;

    public FoodController(FoodService foodService, UserService userService, RestaurantService restaurantService) {
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


    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantsFood(
            @RequestParam boolean vegetarian,
            @RequestParam boolean nonVegetarian,
            @RequestParam boolean seasonal,
            @RequestParam(required = false) String food_category,

            @PathVariable long restaurantId,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);

        List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, nonVegetarian, seasonal, food_category);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
