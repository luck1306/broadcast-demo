package net.broadcast.chatting.global.error;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ErrorResponse {
    String message;
    int statCode;

    public ErrorResponse(ErrorCode errorCode) {
        this.message = errorCode.getMessage();
        this.statCode = errorCode.getStatCode();
    }
}
