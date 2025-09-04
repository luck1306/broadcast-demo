package net.broadcast.chatting.domain.user.exception;

import net.broadcast.chatting.global.error.CommonCustomException;
import net.broadcast.chatting.global.error.ErrorCode;

public class NotLoginCurrentException extends CommonCustomException {
    public static final NotLoginCurrentException EXCPETION = new NotLoginCurrentException();
    NotLoginCurrentException() {
        super(ErrorCode.NOT_LOGIN_CURRENT);
    }
    
}
