package com.jarvis.onlinefoodordering.request;

import com.jarvis.onlinefoodordering.model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private long restaurantId;
    private Address deliveryAddress;
}
