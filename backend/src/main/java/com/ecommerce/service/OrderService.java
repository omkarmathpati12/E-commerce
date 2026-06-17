package com.ecommerce.service;

import com.ecommerce.entity.Cart;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, CartRepository cartRepository,
                         UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<Order> getOrders(Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        return orderRepository.findByUser(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order placeOrder(Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        List<Cart> carts = cartRepository.findByUser(user);
        
        if (carts.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        Order order = null;
        for (Cart cart : carts) {
            Product product = cart.getProduct();
            
            Order newOrder = new Order();
            newOrder.setUser(user);
            newOrder.setProduct(product);
            newOrder.setQuantity(cart.getQuantity());
            newOrder.setTotalPrice(product.getPrice() * cart.getQuantity());
            newOrder.setOrderDate(LocalDateTime.now());
            
            order = orderRepository.save(newOrder);
            
            product.setStock(product.getStock() - cart.getQuantity());
            productRepository.save(product);
            
            cartRepository.delete(cart);
        }
        
        return order;
    }

    private User getUserFromAuthentication(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
