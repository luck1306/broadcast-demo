package net.broadcast.chatting.global.error;

import lombok.Getter;
import lombok.NoArgsConstructor;
import net.broadcast.chatting.global.error.stomp.StompErrorCode;

@Getter
@NoArgsConstructor
public class ErrorResponse {
    String message;
    int statCode;

    public ErrorResponse(ErrorCode errorCode) {
        this.message = errorCode.getMessage();
        this.statCode = errorCode.getStatCode();
    }

    public ErrorResponse(StompErrorCode errorCode) {
        this.message = errorCode.getTimeStamp().toString() + errorCode.getMessage();
        this.statCode = errorCode.getStateCode();
    }
}
