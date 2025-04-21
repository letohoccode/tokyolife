package org.example.clothes_shop_backend;

import lombok.RequiredArgsConstructor;
import org.example.clothes_shop_backend.service.RoleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableJpaAuditing
@EnableCaching
public class ClothesShopBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClothesShopBackendApplication.class, args);
	}


}
