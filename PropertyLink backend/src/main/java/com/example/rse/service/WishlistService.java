package com.example.rse.service;

import com.example.rse.model.Wishlist;
import com.example.rse.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    public List<Wishlist> findAll() {
        return wishlistRepository.findAll();
    }

    public Optional<Wishlist> findById(Long id) {
        return wishlistRepository.findById(id);
    }

    public Wishlist saveWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public void deleteWishlistById(Long id) {
        wishlistRepository.deleteById(id);
    }
}