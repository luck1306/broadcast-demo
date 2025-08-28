package net.broadcast.chatting.domain.user.exception;

import net.broadcast.chatting.global.error.CommonCustomException;

public class NoSuchUserException extends CommonCustomException {
    public static final NoSuchUserException EXCEPTION = new NoSuchUserException();

    private NoSuchUserException() {
        super(net.broadcast.chatting.global.error.ErrorCode.NO_SUCH_USER);
    }
    
}
