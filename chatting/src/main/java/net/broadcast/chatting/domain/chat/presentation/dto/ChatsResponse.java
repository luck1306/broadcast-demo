package net.broadcast.chatting.domain.chat.presentation.dto;

import java.util.List;

@lombok.Getter
public class ChatsResponse {
    final List<ChatMessageDto> chats;
    public ChatsResponse(List<ChatMessageDto> chats) {
        this.chats = chats;
    }
}
