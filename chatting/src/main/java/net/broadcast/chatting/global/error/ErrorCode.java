package net.broadcast.chatting.global.error;

import lombok.Getter;

@Getter
public enum ErrorCode {
    ALREADY_EXIST_NICKNAME("이미 존재하는 닉네임입니다.", 400),
    PASSWORD_IS_WRONG("비밀번호가 틀렸습니다.", 400),
    NO_SUCH_USER("존재하지 않는 유저입니다.", 404);


    final String message;
    final int statCode;

    ErrorCode(String message, int statCode) {
        this.message = message;
        this.statCode = statCode;
    }
}
