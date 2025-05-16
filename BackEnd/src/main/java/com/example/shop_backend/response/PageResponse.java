package com.example.shop_backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class PageResponse <T>{
    private int number;
    private int size;
    private int totalPages;
    private Long totalElement;
    private T data;
    private boolean first;
    private boolean last;

}
