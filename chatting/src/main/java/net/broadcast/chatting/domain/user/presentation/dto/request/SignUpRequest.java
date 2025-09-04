package net.broadcast.chatting.domain.user.presentation.dto.request;

@lombok.Getter
public class SignUpRequest {
    String nickname;
    String accountId;
    String password;
    String role;
}