package com.jarvis.onlinefoodordering.controller;

import com.jarvis.onlinefoodordering.model.IngredientCategory;
import com.jarvis.onlinefoodordering.model.IngredientsItem;
import com.jarvis.onlinefoodordering.request.IngredientCategoryRequest;
import com.jarvis.onlinefoodordering.request.IngredientRequest;
import com.jarvis.onlinefoodordering.service.IngredientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(
            @RequestBody IngredientCategoryRequest request
    ) throws Exception {
        IngredientCategory item = ingredientService.
                createIngredientCategory(request.getName(), request.getRestaurantId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<IngredientsItem> createIngredientCategory(
            @RequestBody IngredientRequest request
    ) throws Exception {
        IngredientsItem item = ingredientService.
                createIngredientsItem(request.getRestaurantId(), request.getIngredientName(), request.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientsItem> updateIngredientItemStock(
            @PathVariable Long id
    ) throws Exception {
        IngredientsItem item = ingredientService.updateIngredientItemStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientsItem>> getRestaurantIngredient(
            @PathVariable Long id
    ) throws Exception {
        List<IngredientsItem> item = ingredientService.findRestaurantIngredients(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(
            @PathVariable Long id
    ) throws Exception {
        List<IngredientCategory> item = ingredientService.findIngredientCategoryByRestaurantId(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }
}
