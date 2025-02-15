package com.example.rse.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long buyerId; // Reference to the Buyer

    @OneToMany
    private List<Property> propertyIds; // List of property IDs in the cart

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public List<Property> getPropertyIds() {
        return propertyIds;
    }

    public void setPropertyIds(List<Property> propertyIds) {
        this.propertyIds = propertyIds;
    }
}