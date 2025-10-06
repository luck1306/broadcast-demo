package net.broadcast.chatting.domain.channel.exception;

import net.broadcast.chatting.global.error.CommonCustomException;
import net.broadcast.chatting.global.error.ErrorCode;

public class AlreadyExistChannelException extends CommonCustomException {
    public static final AlreadyExistChannelException EXCEPTION = new AlreadyExistChannelException();
    AlreadyExistChannelException() {
        super(ErrorCode.ALREADY_EXIST_CHANNEL);
    }
    
}
