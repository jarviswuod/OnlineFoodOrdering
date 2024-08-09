package com.jarvis.onlinefoodordering.request;

import lombok.Data;

@Data
public class LoginRequest {
    String email;
    String password;
}
