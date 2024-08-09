package com.jarvis.onlinefoodordering.response;

import com.jarvis.onlinefoodordering.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {

    private String jtw;

    private String message;

    private USER_ROLE role;
}
