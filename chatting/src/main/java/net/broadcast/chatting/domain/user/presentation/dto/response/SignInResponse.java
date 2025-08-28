package net.broadcast.chatting.domain.user.presentation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class SignInResponse {
    final String accessToken;
    final String refreshToken;
}
