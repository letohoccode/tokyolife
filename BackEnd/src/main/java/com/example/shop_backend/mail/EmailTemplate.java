package com.example.shop_backend.mail;

import lombok.*;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum EmailTemplate {
    ACCOUNT_ACTIVATE("account_activate")
    ;
    private String name;


}

