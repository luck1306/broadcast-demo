package net.broadcast.chatting.domain.chat.presentation;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageDto;
import net.broadcast.chatting.domain.chat.service.ChattingsService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@RestController
public class WSChattingController {

    final ChattingsService chattingsService;
    
    @MessageMapping("/message/{channelName}")
    @SendTo("/sub/chat/{channelName}")
    public ChatMessageDto message(
        ChatMessageDto request, 
        @DestinationVariable String channelName
    ) {
        return chattingsService.sendMessage(request, channelName);
    }

    @GetMapping("/")
    public String helloWorld() {
        return "Hello World";
    }

    @GetMapping("/{channelName}")
    public String getChannelName(@PathVariable String channelName) {
        return chattingsService.getChannelName(channelName);
    }
    
}
