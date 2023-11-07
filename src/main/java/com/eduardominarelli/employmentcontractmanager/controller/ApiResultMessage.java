package com.eduardominarelli.employmentcontractmanager.controller;

public class ApiResultMessage {

    private String message;

    public static ApiResultMessage withMessage(String message) {
        ApiResultMessage apiResultMessage = new ApiResultMessage();
        apiResultMessage.setMessage(message);
        return apiResultMessage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
