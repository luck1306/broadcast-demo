package net.broadcast.chatting.global.error.stomp;

import lombok.Getter;

@Getter
public class StompCustomException extends RuntimeException {
    
    final StompErrorCode errorCode;
    
    public StompCustomException(StompErrorCode errorCode) {
        this.errorCode = errorCode;
    }
    
}
