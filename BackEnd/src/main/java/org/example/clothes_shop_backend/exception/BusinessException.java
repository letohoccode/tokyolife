package org.example.clothes_shop_backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum BusinessException {
    NO_CODE(0,"No Code",HttpStatus.NOT_IMPLEMENTED),
    INCORRECT_CURRENT_PASSWORD(300,"Current password is incorrect",HttpStatus.BAD_REQUEST),
    NEW_PASSWORD_DOES_NOT_MATCH(301,"the new password does not match",HttpStatus.BAD_REQUEST),
    ACCOUNT_LOCKED(302,"User account is locked",HttpStatus.FORBIDDEN),
    ACCOUNT_DISABLE(303,"User account is disable",HttpStatus.FORBIDDEN),
    BAD_CREDENTIALS(304,"Login and password is incorrect",HttpStatus.FORBIDDEN)
    ;


    @Getter
    private final int code;
    @Getter
    private final String name;
    @Getter
    private final HttpStatus httpStatus;

    BusinessException(int code,String name, HttpStatus httpStatus) {
        this.code = code;
        this.name = name;
        this.httpStatus = httpStatus;
    }
}
