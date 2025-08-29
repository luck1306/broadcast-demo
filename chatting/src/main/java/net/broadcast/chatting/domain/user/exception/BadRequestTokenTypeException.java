package net.broadcast.chatting.domain.user.exception;

import net.broadcast.chatting.global.error.CommonCustomException;
import net.broadcast.chatting.global.error.ErrorCode;

public class BadRequestTokenTypeException extends CommonCustomException {
    public static final BadRequestTokenTypeException EXCEPTION =
        new BadRequestTokenTypeException();
    
    BadRequestTokenTypeException() {
        super(ErrorCode.BAD_REQUEST_TOKEN_TYPE);
    }
    
}
