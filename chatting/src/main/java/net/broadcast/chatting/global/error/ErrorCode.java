package net.broadcast.chatting.global.error;

import lombok.Getter;

@Getter
public enum ErrorCode {
    ALREADY_EXIST_NICKNAME("이미 존재하는 닉네임입니다.", 400);


    final String message;
    final int statCode;

    ErrorCode(String message, int statCode) {
        this.message = message;
        this.statCode = statCode;
    }
}
