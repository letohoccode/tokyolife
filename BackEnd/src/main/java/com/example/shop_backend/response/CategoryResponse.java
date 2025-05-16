package com.example.shop_backend.response;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
   private String category;
   private String id;
}
