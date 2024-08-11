package com.jarvis.onlinefoodordering.service;

import com.jarvis.onlinefoodordering.model.Cart;
import com.jarvis.onlinefoodordering.model.CartItem;
import com.jarvis.onlinefoodordering.model.Food;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.repository.CartItemRepository;
import com.jarvis.onlinefoodordering.repository.CartRepository;
import com.jarvis.onlinefoodordering.request.AddCartItemRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final FoodService foodService;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, UserService userService, FoodService foodService) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.foodService = foodService;
    }


    public CartItem addItemToCart(AddCartItemRequest req, String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Food food = foodService.findByFoodId(req.getFoodId());
        Cart cart = cartRepository.findByCustomerId(user.getId());

        for (CartItem cartItem : cart.getItems()) {
            if (cartItem.getFood().equals(food)) {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }

        CartItem cartItem = new CartItem();
        cartItem.setFood(food);
        cartItem.setCart(cart);
        cartItem.setQuantity(req.getQuantity());
        cartItem.setIngredients(req.getIngredients());
        cartItem.setTotalPrice(req.getQuantity() + food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(cartItem);
        cart.getItems().add(savedCartItem);
        return savedCartItem;

    }

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()) {
            throw new Exception("Cart Item not found");
        }
        CartItem cartItem = cartItemOptional.get();
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(cartItem.getFood().getPrice() * quantity);
        return cartItemRepository.save(cartItem);
    }

    public CartItem removeItemFromCart(Long cartItemId, String token) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()) {
            throw new Exception("Cart Item not found");
        }

        CartItem cartItem = cartItemOptional.get();
        cart.getItems().remove(cartItem);

        return cartItemRepository.save(cartItem);
    }

    public Long calculateCartTotals(Cart cart) throws Exception {
        long total = 0L;
        for (CartItem cartItem : cart.getItems()) {
            total += cartItem.getFood().getPrice() + cartItem.getQuantity();
        }
        return total;
    }

    public Cart findCartById(Long cartId) throws Exception {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isEmpty()) {
            throw new Exception("Cart not found with id " + cartId);
        }
        return cartOptional.get();
    }

    public Cart findCartByUserId(long userId) throws Exception {
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotals(cart));
        return cart;
    }

    public Cart clearCart(long userId) throws Exception {
        Cart cart = findCartByUserId(userId);
        cart.getItems().clear();

        return cartRepository.save(cart);
    }
}
