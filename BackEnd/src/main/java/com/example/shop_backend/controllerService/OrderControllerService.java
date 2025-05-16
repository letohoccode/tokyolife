package com.example.shop_backend.controllerService;

import com.example.shop_backend.entity.OrderEntity;
import com.example.shop_backend.entity.OrderItem;
import com.example.shop_backend.entity.User;
import com.example.shop_backend.mapper.AddressMapper;
import com.example.shop_backend.mapper.OrderItemMapper;
import com.example.shop_backend.mapper.OrderMapper;
import com.example.shop_backend.request.OrderItemRequest;
import com.example.shop_backend.request.OrderRequest;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.response.OrderResponse;
import com.example.shop_backend.response.PageResponse;
import com.example.shop_backend.service.OrderItemService;
import com.example.shop_backend.service.OrderService;
import com.example.shop_backend.service.UserService;
import com.example.shop_backend.utilsEnum.OrderTypeStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderControllerService {
    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final UserService userService;
    private final OrderItemService orderItemService;
    private final OrderItemMapper orderItemMapper;

    public DataResponse<List<OrderResponse>> findOrderByUserId(Long userId) {
        List<OrderEntity> orderEntities =orderService.findOrderByUserId(userId);
        if(orderEntities == null)
            return DataResponse.<List<OrderResponse>>builder()
                    .message("chua co don hang nao")
                    .build();
        List<OrderResponse> orderResponses = orderEntities.stream()
                .map(orderMapper::OrderListResponse)
                .toList();
        return DataResponse.<List<OrderResponse>>builder()
                .message("lay data thanh cong")
                .data(orderResponses)
                .build();

    }

    public DataResponse<String> saveOrder(OrderRequest request) {
        User user = userService.findById(request.getUserId());
        if (user == null)
            return DataResponse.<String>builder()
                    .message("don hang khong thanh cong")
                    .build();
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setTotalItems(request.getTotalItems());
        orderEntity.setComment(request.getComment());
        orderEntity.setTotalPrice(request.getTotalPrice());
        orderEntity.setStatus(String.valueOf(OrderTypeStatus.UNCONFIRMED));
        orderEntity.setCreate(LocalDateTime.now());
        orderEntity.setUser(user);
        OrderEntity saveOrder = orderService.saveOrderEntity(orderEntity);
        List<OrderItem> orderItems = request.getOrderItemRequests().stream()
                .map(item -> orderItemMapper.orderItem(item,saveOrder)).toList();
        orderItemService.saveListOrderItem(orderItems);
        return DataResponse.<String>builder()
                .message("dat hang thanh cong")
                .build();
    }
    public DataResponse<PageResponse<List<OrderResponse>>> getAllOrderByType(String orderType,int page,int  size) {

        Pageable pageable = PageRequest.of(page,size, Sort.by("create").descending());
        Page<OrderEntity> orderEntities = orderService.findAllOrderByStatus(orderType,pageable);
        List<OrderResponse> listPageResponse =orderEntities.stream()
                .map(orderMapper::OrderListResponse)
                .toList();

        return DataResponse.<PageResponse<List<OrderResponse>>>builder()
                .message("lay data thanh cong")
                .data(PageResponse.<List<OrderResponse>>builder()
                        .first(orderEntities.isFirst())
                        .last(orderEntities.isLast())
                        .totalPages(orderEntities.getTotalPages())
                        .totalElement(orderEntities.getTotalElements())
                        .size(orderEntities.getSize())
                        .number(orderEntities.getNumber())
                        .data(listPageResponse)
                        .build())
                .build();
    }

    public DataResponse<OrderResponse> getTotalPrice() {
        List<OrderEntity> orderEntities = orderService.findTotalPrice("SUCCESS");

        Long totalPrice = orderEntities.stream().mapToLong(OrderEntity::getTotalPrice).sum();
        Long totalItem = orderEntities.stream().mapToLong(OrderEntity::getTotalItems).sum();

        return DataResponse.<OrderResponse>builder()
                .message("lay data thanh cong")
                .data(OrderResponse.builder()
                        .totalPrice(totalPrice)
                        .totalItem(totalItem)
                        .orderTotal(orderEntities.stream().count())
                        .build())
                .build();
    }

    public DataResponse<String> confirmOrderStatus(String type, String orderId) {
        UUID Id = UUID.fromString(orderId);
        orderService.updateStatusOrder(type,Id);
        return DataResponse.<String>builder()
                .message("cap nhat thanh cong")
                .build();
    }

    public DataResponse<OrderResponse> findOrderByOrderId(String orderId) {
        OrderEntity orderEntity = orderService.findOrderEntityId(UUID.fromString(orderId));
        OrderResponse orderResponse = orderMapper.OrderDetailResponse(orderEntity);
        return DataResponse.<OrderResponse>builder()
                .message("lay data thanh cong")
                .data(orderResponse)
                .build();
    }

    public DataResponse<PageResponse<List<OrderResponse>>> getAllOrders() {

        Pageable pageable = PageRequest.of(0, 10, Sort.by("create").descending());
        Page<OrderEntity> orderEntities = orderService.findAllOrders(pageable);
        List<OrderResponse> listPageResponse =orderEntities.stream()
                .map(orderMapper::OrderListResponse)
                .toList();
        return DataResponse.<PageResponse<List<OrderResponse>>>builder()
                .message("lay data thanh cong")
                .data(PageResponse.<List<OrderResponse>>builder()
                        .first(orderEntities.isFirst())
                        .last(orderEntities.isLast())
                        .totalPages(orderEntities.getTotalPages())
                        .totalElement(orderEntities.getTotalElements())
                        .size(orderEntities.getSize())
                        .number(orderEntities.getNumber())
                        .data(listPageResponse)
                        .build())
                .build();
    }
}
