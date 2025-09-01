package net.broadcast.chatting.domain.chat.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageDto;

@RequiredArgsConstructor
@Service
public class ChattingsService {
    public ChatMessageDto sendMessage(ChatMessageDto request) {
        return request;
    }
}
