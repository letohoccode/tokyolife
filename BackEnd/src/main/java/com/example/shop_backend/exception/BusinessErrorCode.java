package com.example.shop_backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


public enum BusinessErrorCode {

    ACCOUNT_LOCKED(302,"User account is locked",HttpStatus.FORBIDDEN),
    ACCOUNT_DISABLE(303,"User account is Disable",HttpStatus.FORBIDDEN),
    BAD_CREDENTIALS(304,"Login and Password is incorrect",HttpStatus.FORBIDDEN)

    ;
    @Getter
    private final int code;
    @Getter
    private final String message;
    @Getter
    private final HttpStatus httpStatus;

    BusinessErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
