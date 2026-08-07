package com.ecommerce.service;

import com.ecommerce.entity.Order;
import com.ecommerce.entity.Payment;
import com.ecommerce.enums.OrderStatus;
import com.ecommerce.enums.PaymentMethods;
import com.ecommerce.enums.PaymentStatus;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.PaymentRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private final PaymentRepo paymentrepo;
    private final OrderRepository ordersrepo;

    public Payment makePayment(Long id, PaymentMethods paymentMethods){
        Order order=ordersrepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Order Not found"));

        if(paymentrepo.existsByOrder(order)){
            throw new RuntimeException("paymenyt already exists for this order");
        }
        Payment payment=new Payment();
        payment.setOrder(order);
        payment.setAmount(order.getPayment().getAmount());
        payment.setPaymentMethods(paymentMethods);
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setTransactionId(UUID.randomUUID().toString());
        order.setPayment(payment);
        order.setStatus(OrderStatus.PAID);
        ordersrepo.save(order);
        return paymentrepo.save(payment);
    }

    public Payment getPaymentByOrderId(Long orderId) {

        Order order = ordersrepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return paymentrepo.findByOrder(order)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
