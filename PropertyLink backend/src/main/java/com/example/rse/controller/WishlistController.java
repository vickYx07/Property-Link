package com.example.rse.controller;

import com.example.rse.model.Wishlist;
import com.example.rse.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlists")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public List<Wishlist> getAllWishlists() {
        return wishlistService.findAll();
    }

    @PostMapping
    public ResponseEntity<Wishlist> createWishlist(@RequestBody Wishlist wishlist) {
        return ResponseEntity.ok(wishlistService.saveWishlist(wishlist));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWishlist(@PathVariable Long id) {
        wishlistService.deleteWishlistById(id);
        return ResponseEntity.noContent().build();
    }
}