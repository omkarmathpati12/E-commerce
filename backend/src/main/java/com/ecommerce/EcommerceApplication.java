package com.ecommerce;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EcommerceApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }

    @Bean
    CommandLineRunner init(UserService userService, ProductRepository productRepository) {
        return args -> {
            userService.initAdmin();
            if (productRepository.count() == 0) {
                productRepository.save(new Product(null, "Wireless Headphones", "Immersive sound experience with active noise cancellation.", 149.99, 20, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"));
                productRepository.save(new Product(null, "Smart Watch Series X", "Track fitness metrics, heart rate and sleep with vibrant display.", 199.99, 15, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"));
                productRepository.save(new Product(null, "Ergonomic Gaming Chair", "Premium leather upholstery with adjustable lumbar support.", 249.50, 10, "https://images.unsplash.com/photo-1580481072645-022f9a6d127b?w=500"));
                productRepository.save(new Product(null, "Mechanical Keyboard", "RGB backlit tactile switches with customizable macro keys.", 89.99, 30, "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"));
            }
        };
    }
}
