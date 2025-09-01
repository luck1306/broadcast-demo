package net.broadcast.chatting.domain.chat.presentation;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageDto;
import net.broadcast.chatting.domain.chat.service.ChattingsService;

import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@RestController
public class WSChattingController {

    final ChattingsService chattingsService;
    
    @MessageMapping("/message/{channelId}")
    @SendTo("/sub/chat/{channelId}")
    public ChatMessageDto message(ChatMessageDto request) {
        return request;
    }

    @GetMapping("/")
    public String getMethodName() {
        return "Hello World";
    }
    
}
