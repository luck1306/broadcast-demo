package net.broadcast.chatting.domain.chat.presentation;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageRequest;
import org.springframework.web.bind.annotation.GetMapping;



@RequiredArgsConstructor
@RestController
public class WSChattingController {
    
    @SuppressWarnings("unused")
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/message")
    @SendTo("/sub/chat/room/{roomId}")
    public String message(ChatMessageRequest request) {
        return request.getMessage();
        // messagingTemplate.convertAndSend(
        //     "/sub/chat/room/" + request.getRoomId(), request
        // );
    }

    @GetMapping("/")
    public String getMethodName() {
        return "Hello World";
    }
    
}
