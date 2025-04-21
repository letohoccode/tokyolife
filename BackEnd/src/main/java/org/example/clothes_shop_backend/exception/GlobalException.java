package org.example.clothes_shop_backend.exception;

import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.management.OperationsException;
import java.util.HashSet;
import java.util.Set;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(LockedException.class)
    public ResponseEntity<?> handleLocked(LockedException exception)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessException.ACCOUNT_LOCKED.getCode())
                                .businessErrorDescription(BusinessException.ACCOUNT_LOCKED.getName())
                                .error(exception.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<?> handleLocked(DisabledException exception)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessException.ACCOUNT_DISABLE.getCode())
                                .businessErrorDescription(BusinessException.ACCOUNT_DISABLE.getName())
                                .error(exception.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> Exception(BadCredentialsException exception)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessException.BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BusinessException.BAD_CREDENTIALS.getName())
                                .error(exception.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<?> MessagingException(MessagingException exception)
    {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .error(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> MethodArgument(MethodArgumentNotValidException exception)
    {
        Set<String> set = new HashSet<>();
        exception.getBindingResult().getAllErrors()
                .stream()
                .forEach(e -> {
                    var errorMessage = e.getDefaultMessage();
                    set.add(errorMessage);
                        }
                );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validationError(set)
                                .build()
                );
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> Exception(Exception exception)
    {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Internal Error,Contact the Admin")
                                .error(exception.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(OperationsException.class)
    public ResponseEntity<?> Exception(OperationsException exception)
    {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Internal Error,Contact the Admin")
                                .error(exception.getMessage())
                                .build()
                );
    }
}
