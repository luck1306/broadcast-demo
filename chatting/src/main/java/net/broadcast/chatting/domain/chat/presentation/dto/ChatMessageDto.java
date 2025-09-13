package net.broadcast.chatting.domain.chat.presentation.dto;

@lombok.Getter
@lombok.Setter
@lombok.NoArgsConstructor
public class ChatMessageDto {
    private String sender;
    private String message;
}
