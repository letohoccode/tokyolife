package org.example.clothes_shop_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.clothes_shop_backend.model.Role;
import org.example.clothes_shop_backend.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    public void createRole()
    {
        Role role1 = new Role();
        role1.setName("USER");

        Role role2 = new Role();
        role2.setName("MANAGER");
        Role role3 = new Role();
        role3.setName("ADMIN");
        roleRepository.save(role3);
        roleRepository.save(role2);
        roleRepository.save(role1);

    }
}
