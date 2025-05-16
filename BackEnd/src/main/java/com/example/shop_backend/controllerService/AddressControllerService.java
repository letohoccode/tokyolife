package com.example.shop_backend.controllerService;

import com.example.shop_backend.entity.Address;
import com.example.shop_backend.response.AddressResponse;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressControllerService {
    private final AddressService addressService;


    public DataResponse<AddressResponse> findAddressById(Long addressId) {
        Address address =addressService.findAddressById(addressId);
        if (address == null)
            return DataResponse.<AddressResponse>builder()
                    .message("khong tim thay")
                    .build();
        return DataResponse.<AddressResponse>builder()
                .message("lay dia chi thanh cong")
                .data(AddressResponse.builder()
                        .street(address.getStreet())
                        .commune(address.getCommune())
                        .conscious(address.getConscious())
                        .district(address.getDistrict())
                        .build()
                )
                .build();
    }
}
