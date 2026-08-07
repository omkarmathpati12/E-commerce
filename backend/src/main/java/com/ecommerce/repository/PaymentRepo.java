package com.ecommerce.repository;

import com.ecommerce.entity.Order;
import com.ecommerce.entity.Payment;
import com.ecommerce.enums.PaymentMethods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepo extends JpaRepository<Payment,Long > {
    Optional<Payment> findByOrder(Order order);

    boolean existsByOrder(Order order);
}
