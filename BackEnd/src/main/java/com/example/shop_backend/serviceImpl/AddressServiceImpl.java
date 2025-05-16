package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.Address;
import com.example.shop_backend.repository.AddressRepository;
import com.example.shop_backend.service.AddressService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    @Transactional
    @Override
    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public List<Address> findAllAddressById() {
        return addressRepository.findAll();
    }

    @Override
    public Address findAddressById(Long id) {
        return addressRepository.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public Address updateAddress(Address address) {
        return addressRepository.save(address);
    }

    @Transactional
    @Override
    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }
}
