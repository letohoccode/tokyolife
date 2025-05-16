package com.example.shop_backend;

import com.example.shop_backend.entity.User;
import com.example.shop_backend.service.UserService;
import com.example.shop_backend.utilsEnum.UserRoles;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableCaching
@EnableJpaAuditing
@OpenAPIDefinition
public class ShopBackendApplication implements CommandLineRunner{
	private final UserService userService;
	private final PasswordEncoder passwordEncoder;
    public ShopBackendApplication(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    public static void main(String[] args) {
		SpringApplication.run(ShopBackendApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		User user1 = userService.findUserByRole();
		if (user1 == null)
		{
			User user = new User();
			user.setEmail("letoadmin@gmail.com");
			user.setPassword(passwordEncoder.encode("leto2004"));
			user.setEnable(true);
			user.setBlocked(true);
			user.setRoles(UserRoles.ADMIN);
			userService.saveUser(user);
		}
	}
}
