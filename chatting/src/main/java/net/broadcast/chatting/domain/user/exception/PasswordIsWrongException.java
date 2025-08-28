package net.broadcast.chatting.domain.user.exception;

import net.broadcast.chatting.global.error.CommonCustomException;

public class PasswordIsWrongException extends CommonCustomException {
    public static final PasswordIsWrongException EXCEPTION = new PasswordIsWrongException();

    private PasswordIsWrongException() {
        super(net.broadcast.chatting.global.error.ErrorCode.PASSWORD_IS_WRONG);
    }
    
}
