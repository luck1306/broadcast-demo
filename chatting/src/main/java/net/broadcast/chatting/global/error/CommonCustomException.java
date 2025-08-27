package net.broadcast.chatting.global.error;

import lombok.Getter;

@Getter
public class CommonCustomException extends RuntimeException {
    final ErrorCode errorCode;
    public CommonCustomException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
    
}
