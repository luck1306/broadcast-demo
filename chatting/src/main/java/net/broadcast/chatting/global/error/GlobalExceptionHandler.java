package net.broadcast.chatting.global.error;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(CommonCustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CommonCustomException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity
            .status(errorCode.getStatCode())
            .body(new ErrorResponse(errorCode));
    }
}
