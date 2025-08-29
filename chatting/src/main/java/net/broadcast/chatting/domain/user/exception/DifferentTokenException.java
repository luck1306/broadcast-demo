package net.broadcast.chatting.domain.user.exception;

import net.broadcast.chatting.global.error.CommonCustomException;

public class DifferentTokenException extends CommonCustomException {
    public static final DifferentTokenException EXCEPTION = new DifferentTokenException();

    DifferentTokenException() {
       super(net.broadcast.chatting.global.error.ErrorCode.DIFFERENT_TOKEN);
    }
    
}
