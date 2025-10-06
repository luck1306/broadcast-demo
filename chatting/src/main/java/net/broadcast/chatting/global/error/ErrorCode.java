package net.broadcast.chatting.global.error;

import lombok.Getter;

@Getter
public enum ErrorCode {
    ALREADY_EXIST_NICKNAME("이미 존재하는 닉네임입니다.", 400),
    PASSWORD_IS_WRONG("비밀번호가 틀렸습니다.", 400),
    NO_SUCH_USER("존재하지 않는 유저입니다.", 404),
    BAD_REQUEST_TOKEN_TYPE("잘못된 토큰 타입입니다.", 400),
    DIFFERENT_TOKEN("저장된 값과 다른 Refresh 토큰입니다.", 401),
    CHANNEL_NOT_FOUND("존재하지 않는 채널입니다.", 404),
    NOT_LOGIN_CURRENT("로그인 상태가 아닙니다.", 409),
    ALREADY_EXIST_CHANNEL("이미 존재하는 채널입니다.", 400);


    final String message;
    final int statCode;

    ErrorCode(String message, int statCode) {
        this.message = message;
        this.statCode = statCode;
    }
}
