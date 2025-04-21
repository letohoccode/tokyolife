package org.example.clothes_shop_backend.security;

import lombok.RequiredArgsConstructor;
import org.example.clothes_shop_backend.model.Role;
import org.example.clothes_shop_backend.repository.RoleRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class BeanConfig {
    private final UserDetailsService userDetailsService;
    private final RoleRepository roleRepository;
    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
        dao.setUserDetailsService(userDetailsService);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception
    {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public Role createRole()
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
        return null;
    }
}
