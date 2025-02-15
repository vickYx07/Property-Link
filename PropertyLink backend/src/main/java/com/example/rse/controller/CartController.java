package com.example.rse.controller;

import com.example.rse.model.Cart;
import com.example.rse.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.findAll();
    }

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.saveCart(cart));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        cartService.deleteCartById(id);
        return ResponseEntity.noContent().build();
    }
}