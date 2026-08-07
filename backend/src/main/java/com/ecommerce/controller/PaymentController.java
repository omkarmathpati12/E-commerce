package com.ecommerce.controller;

import com.ecommerce.entity.Payment;
import com.ecommerce.enums.PaymentMethods;
import com.ecommerce.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/{orderId}")
    public ResponseEntity<Payment> pay(
            @PathVariable Long orderId,
            @RequestParam PaymentMethods paymentMethod) {

        Payment payment = paymentService.makePayment(orderId, paymentMethod);

        return ResponseEntity.ok(payment);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long orderId) {

        return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId));
    }
}
