package com.jarvis.onlinefoodordering.request;

import lombok.Data;

@Data
public class UpdateCartItemRequest {
    private long cartItemId;
    private int quantity;
}
