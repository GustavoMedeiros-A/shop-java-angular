package com.shopsmart.shop.utils;

public class ApiResponse {
    private String message;

    public ApiResponse(final String message) {
        this.message = message;
    }

    public String getMessage() {return message;}

    public void setMessage(final String message) {this.message = message;}

}
