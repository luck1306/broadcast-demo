package net.broadcast.chatting.domain.chat.presentation.dto;

@lombok.Getter
@lombok.Setter
@lombok.NoArgsConstructor
@lombok.ToString
public class ChatMessageDto {
    private String sender;
    private String message;

    public ChatMessageDto(String sender, String message) {
        this.sender = sender;
        this.message = message;
    }
}
