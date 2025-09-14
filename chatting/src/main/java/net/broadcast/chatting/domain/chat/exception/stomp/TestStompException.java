package net.broadcast.chatting.domain.chat.exception.stomp;

import net.broadcast.chatting.global.error.stomp.StompCustomException;
import net.broadcast.chatting.global.error.stomp.StompErrorCode;

public class TestStompException extends StompCustomException {
    public static final TestStompException EXCEPTION = new TestStompException();

    TestStompException() {
        super(StompErrorCode.TEST_EXCEPTION);
    }
    
}
