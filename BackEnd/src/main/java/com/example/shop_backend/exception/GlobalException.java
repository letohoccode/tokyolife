package com.example.shop_backend.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionResponse> handleLocked(LockedException lockedException)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCode.ACCOUNT_LOCKED.getCode())
                                .businessErrorDescription(BusinessErrorCode.ACCOUNT_LOCKED.getMessage())
                                .error(lockedException.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleLocked(DisabledException lockedException)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCode.ACCOUNT_DISABLE.getCode())
                                .businessErrorDescription(BusinessErrorCode.ACCOUNT_DISABLE.getMessage())
                                .error(lockedException.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleLocked(Exception lockedException)
    {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Internal error, contact the Admin")
                                .error(lockedException.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleLocked(BadCredentialsException lockedException)
    {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCode.BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BusinessErrorCode.BAD_CREDENTIALS.getMessage())
                                .error(lockedException.getMessage())
                                .build()
                );
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleLocked(MethodArgumentNotValidException lockedException)
    {
        Set<String> errors= new HashSet<>();
        lockedException.getBindingResult().getAllErrors().forEach(
                error -> {
                    var errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                }
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(
                        ExceptionResponse.builder()
                                .validateError(errors)
                                .build()
                );
    }
    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<ExceptionResponse> JsonProcessingException(JsonProcessingException lockedException)
    {
        log.error("JsonProcessingException",lockedException);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCode.BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BusinessErrorCode.BAD_CREDENTIALS.getMessage())
                                .error(lockedException.getMessage())
                                .build()
                );
    }
}
