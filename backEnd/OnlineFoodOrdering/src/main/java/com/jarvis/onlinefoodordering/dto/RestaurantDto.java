package com.jarvis.onlinefoodordering.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class RestaurantDto {
    private String title;

    @Column(length = 1000)
//    @ElementCollection
    private List<String> images;

    private String description;

    private Long id;
}

