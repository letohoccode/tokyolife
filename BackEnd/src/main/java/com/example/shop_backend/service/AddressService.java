package com.example.shop_backend.service;

import com.example.shop_backend.entity.Address;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AddressService {
    public Address saveAddress(Address address);
    public List<Address> findAllAddressById();
    public Address findAddressById(Long id);
    public Address updateAddress(Address address);
    public void deleteAddress(Long id);
}
