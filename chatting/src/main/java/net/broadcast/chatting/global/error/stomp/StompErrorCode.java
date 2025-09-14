package net.broadcast.chatting.global.error.stomp;

import java.time.Instant;

import lombok.Getter;

@Getter
public enum StompErrorCode {
    INVALID_TOKEN(401, "Invalid Token"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error"),
    TEST_EXCEPTION(400, "This is test exception"),;
    
    Integer stateCode;
    String message;
    Instant timeStamp;

    StompErrorCode(Integer stateCode, String message) {
        this.stateCode = stateCode;
        this.message = message;
        this.timeStamp = Instant.now();
    }
}
