package com.jarvis.onlinefoodordering.service;

import com.jarvis.onlinefoodordering.model.Category;
import com.jarvis.onlinefoodordering.model.Restaurant;
import com.jarvis.onlinefoodordering.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final RestaurantService restaurantService;

    public CategoryService(CategoryRepository categoryRepository, RestaurantService restaurantService) {
        this.categoryRepository = categoryRepository;
        this.restaurantService = restaurantService;
    }


    public Category createCategory(String name, Long userId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);

        return categoryRepository.save(category);
    }


    public List<Category> findCategoryByRestaurantId(Long restaurantId) throws Exception {
        return categoryRepository.findByRestaurantId(restaurantId);
    }

    public Category findCategoryById(Long id) throws Exception {
        Optional<Category> category = categoryRepository.findById(id);

        if (category.isEmpty())
            throw new Exception("Category not found");
        return category.get();
    }
}
