package com.example.shop_backend.mapper;

import com.example.shop_backend.entity.Address;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class AddressMapper {
    private Long id;
    private String street;
    private String commune;
    private String district;
    private String conscious;

    public AddressMapper(Address address) {
        this.id = address.getId();
        this.street = address.getStreet();
        this.commune = address.getCommune();
        this.district = address.getDistrict();
        this.conscious = address.getConscious();
    }
}
