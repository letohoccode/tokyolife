package org.example.clothes_shop_backend.email;

import lombok.Getter;

@Getter
public enum EnumEmail {
    ACTIVATE_ACCOUNT("activate_account")
    ;

    private String name;

    EnumEmail(String name) {
        this.name = name;
    }
}
