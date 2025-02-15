package com.example.rse.repository;

import com.example.rse.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    // Custom query methods can be added here
}