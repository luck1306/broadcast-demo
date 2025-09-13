package net.broadcast.chatting.domain.chat.presentation;

import java.util.HashMap;
import java.util.Map;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageDto;
import net.broadcast.chatting.domain.chat.service.ChattingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@RequiredArgsConstructor
@Controller
public class WSChattingController {

    final ChattingService chattingsService;
    final SimpMessagingTemplate simpMessagingTemplate;
    
    @MessageMapping("/message/{channelName}")
    @SendTo("/sub/chat/{channelName}")
    public ChatMessageDto message(
        @Payload ChatMessageDto request, 
        @DestinationVariable String channelName
    ) {
        chattingsService.sendMessage(request, channelName);
        return request;
        // simpMessagingTemplate.convertAndSend("/sub/chat/" + channelName, request);
    }

    @ResponseBody
    @GetMapping("/csrf") // for issue csrf token
    public Map<String, String> csrf(CsrfToken token) {
        Map<String, String> m = new HashMap<>();
        m.put("headerName", token.getHeaderName()); // e.g. "X-XSRF-TOKEN"
        m.put("parameterName", token.getParameterName()); // e.g. "_csrf"
        m.put("token", token.getToken()); // 마스킹된 토큰
        return m;
    }
    
}
