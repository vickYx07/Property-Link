package com.example.rse.repository;

import com.example.rse.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    // Custom query methods can be added here
}