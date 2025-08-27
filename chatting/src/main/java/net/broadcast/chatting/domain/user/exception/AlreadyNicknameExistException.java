package net.broadcast.chatting.domain.user.exception;

import net.broadcast.chatting.global.error.CommonCustomException;
import net.broadcast.chatting.global.error.ErrorCode;

public class AlreadyNicknameExistException extends CommonCustomException {

    public static final AlreadyNicknameExistException EXCEPTION = new AlreadyNicknameExistException();

    private AlreadyNicknameExistException() {
        super(ErrorCode.ALREADY_EXIST_NICKNAME);
    }
    
}
