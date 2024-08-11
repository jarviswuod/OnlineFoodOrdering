package com.jarvis.onlinefoodordering.controller;

import com.jarvis.onlinefoodordering.model.Cart;
import com.jarvis.onlinefoodordering.model.CartItem;
import com.jarvis.onlinefoodordering.model.User;
import com.jarvis.onlinefoodordering.request.AddCartItemRequest;
import com.jarvis.onlinefoodordering.request.UpdateCartItemRequest;
import com.jarvis.onlinefoodordering.service.CartService;
import com.jarvis.onlinefoodordering.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class CartController {
    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @PutMapping("/cart/add")
    public ResponseEntity<CartItem> addCart(
            @RequestBody AddCartItemRequest req,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        CartItem cartItem = cartService.addItemToCart(req, token);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart-item/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @RequestBody UpdateCartItemRequest req,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        CartItem cartItem = cartService.updateCartItemQuantity(req.getCartItemId(), req.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart-item/{id}/update")
    public ResponseEntity<CartItem> removeCartItem(
            @PathVariable long id,
            @RequestHeader("Authorization") String token
    ) throws Exception {
        CartItem cartItem = cartService.removeItemFromCart(id, token);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Cart cart = cartService.clearCart(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart(
            @RequestHeader("Authorization") String token
    ) throws Exception {
        User user = userService.findUserByJwtToken(token);
        Cart cart = cartService.findCartByUserId(user.getId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }
}
