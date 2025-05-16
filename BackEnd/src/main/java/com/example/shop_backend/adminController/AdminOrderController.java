package com.example.shop_backend.adminController;

import com.example.shop_backend.controllerService.OrderControllerService;
import com.example.shop_backend.request.OrderRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/order")
public class AdminOrderController {
    private final OrderControllerService orderControllerService;

    public AdminOrderController(OrderControllerService orderControllerService) {
        this.orderControllerService = orderControllerService;
    }

    @GetMapping("/findAllOrderByType")
    public ResponseEntity<?> getAllOrderByType(@RequestParam("type")String orderType,
                                               @RequestParam(name = "page",defaultValue = "0",required = false) int page,
                                               @RequestParam(name = "size",defaultValue = "10",required = false)int size
                                               )
    {
        return ResponseEntity.ok(orderControllerService.getAllOrderByType(orderType,page,size));
    }

    @GetMapping("/findTotalPrice")
    public ResponseEntity<?> getTotalPrice()
    {
        return ResponseEntity.ok(orderControllerService.getTotalPrice());
    }
    @GetMapping("/confirmOrder")
    public ResponseEntity<?> confirmOrderStatus(@RequestParam("type")String type,
                                                @RequestParam("orderId")String orderId
                                                )
    {
        return ResponseEntity.ok(orderControllerService.confirmOrderStatus(type,orderId));
    }
    @GetMapping("/findOrderByOrderId/{orderId}")
    public ResponseEntity<?> findOrderByOrderId(@PathVariable("orderId")String orderId)
    {
        return ResponseEntity.ok(orderControllerService.findOrderByOrderId(orderId));
    }
    @GetMapping("/getAllOrders")
    public ResponseEntity<?> getAllOrders()
    {
        return  ResponseEntity.ok(orderControllerService.getAllOrders());
    }
}
