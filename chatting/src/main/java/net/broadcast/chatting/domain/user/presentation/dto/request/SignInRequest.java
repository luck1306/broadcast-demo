package net.broadcast.chatting.domain.user.presentation.dto.request;

@lombok.Getter
public class SignInRequest {
    String accountId;
    String password;
}
