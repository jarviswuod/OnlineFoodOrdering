package com.jarvis.onlinefoodordering.service;

import com.jarvis.onlinefoodordering.model.IngredientCategory;
import com.jarvis.onlinefoodordering.model.IngredientsItem;
import com.jarvis.onlinefoodordering.model.Restaurant;
import com.jarvis.onlinefoodordering.repository.IngredientCategoryRepository;
import com.jarvis.onlinefoodordering.repository.IngredientsItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {
    private final IngredientsItemRepository ingredientsItemRepository;
    private final IngredientCategoryRepository ingredientCategoryRepository;
    private final RestaurantService restaurantService;

    public IngredientService(IngredientsItemRepository ingredientsItemRepository, IngredientCategoryRepository ingredientCategoryRepository, RestaurantService restaurantService) {
        this.ingredientsItemRepository = ingredientsItemRepository;
        this.ingredientCategoryRepository = ingredientCategoryRepository;
        this.restaurantService = restaurantService;
    }

    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory newCategory = new IngredientCategory();
        newCategory.setRestaurant(restaurant);
        newCategory.setName(name);

        return ingredientCategoryRepository.save(newCategory);
    }

    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientCategory> ingredientCategory = ingredientCategoryRepository.findById(id);

        if (ingredientCategory.isEmpty())
            throw new Exception("Ingredient Category not found");

        return ingredientCategory.get();
    }

    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception {
        restaurantService.findRestaurantById(restaurantId);
        return ingredientCategoryRepository.findByRestaurantId(restaurantId);
    }

    public IngredientsItem createIngredientsItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(categoryId);

        IngredientsItem item = new IngredientsItem();
        item.setRestaurant(restaurant);
        item.setName(ingredientName);
        item.setCategory(category);

        IngredientsItem ingredientsItem = ingredientsItemRepository.save(item);
        category.getIngredients().add(ingredientsItem);
        return ingredientsItem;

    }

    public List<IngredientsItem> findRestaurantIngredients(Long restaurantId) throws Exception {
        return ingredientsItemRepository.findByRestaurantId(restaurantId);
    }

    public IngredientsItem updateIngredientItemStock(Long ingredientItemId) throws Exception {
        Optional<IngredientsItem> optionalItem = ingredientsItemRepository.findById(ingredientItemId);
        if (optionalItem.isEmpty())
            throw new Exception("Ingredient Item not found");

        IngredientsItem item = optionalItem.get();
        item.setInStoke(!item.isInStoke());
        return ingredientsItemRepository.save(item);
    }
}
