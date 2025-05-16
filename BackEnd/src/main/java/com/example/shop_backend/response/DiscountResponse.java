package com.example.shop_backend.response;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiscountResponse {
    private String code;
    private LocalDate firstDate;
    private LocalDate lastDate;
    private Long rate;
}
