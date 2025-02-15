package com.example.rse.service;

import com.example.rse.model.Cart;
import com.example.rse.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(id);
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteCartById(Long id) {
        cartRepository.deleteById(id);
    }
}