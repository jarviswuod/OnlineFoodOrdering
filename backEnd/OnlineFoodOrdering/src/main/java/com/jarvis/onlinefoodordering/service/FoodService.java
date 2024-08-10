package com.jarvis.onlinefoodordering.service;

import com.jarvis.onlinefoodordering.model.Category;
import com.jarvis.onlinefoodordering.model.Food;
import com.jarvis.onlinefoodordering.model.Restaurant;
import com.jarvis.onlinefoodordering.repository.FoodRepository;
import com.jarvis.onlinefoodordering.request.CreateFoodRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());

        Food savedFood = foodRepository.save(food);
        restaurant.getFoods().add(savedFood);

        return savedFood;

    }


    public void deleteFood(Long foodId) throws Exception {
        Food food = findByFoodId(foodId);
        food.setRestaurant(null);
        foodRepository.delete(food);
    }

    public List<Food> getRestaurantsFood(
            Long restaurantId, boolean isVegetarian,
            boolean isNonVegetarian, boolean isSeasonal,
            String foodCategory
    ) throws Exception {

        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if (isVegetarian) foods = filterByVegetarian(foods, isVegetarian);
        if (isNonVegetarian) foods = filterByNonVegetarian(foods, isNonVegetarian);
        if (isSeasonal) foods = filterBySeasonal(foods, isSeasonal);

        if (foodCategory != null && !foodCategory.equals("")) {
            foods = filterByCategory(foods, foodCategory);
        }
        return foods;

    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if (food.getFoodCategory() != null) {
                return food.getFoodCategory().getName().equals(foodCategory);
            }

            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
        return foods.stream().filter(food -> food.isSeasonal() == isSeasonal).collect(Collectors.toList());
    }

    private List<Food> filterByNonVegetarian(List<Food> foods, boolean isNonVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian() == isNonVegetarian).collect(Collectors.toList());
    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian() == isVegetarian).collect(Collectors.toList());
    }

    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    public Food findByFoodId(Long foodId) throws Exception {
        Optional<Food> optionalFood = foodRepository.findById(foodId);
        if (optionalFood.isEmpty()) {
            throw new Exception("Food not exist...");
        }
        return optionalFood.get();

    }

    public Food updateAvailability(Long foodId) throws Exception {
        Food food = findByFoodId(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
