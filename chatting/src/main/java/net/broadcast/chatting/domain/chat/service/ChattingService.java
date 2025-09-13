package net.broadcast.chatting.domain.chat.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.channel.domain.repository.ChannelRepository;
import net.broadcast.chatting.domain.channel.exception.ChannelNotFoundException;
import net.broadcast.chatting.domain.chat.domain.Chat;
import net.broadcast.chatting.domain.chat.domain.repository.ChatRepository;
import net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageDto;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.domain.user.domain.repository.UserRepository;
import net.broadcast.chatting.domain.user.exception.NoSuchUserException;

@RequiredArgsConstructor
@Service
public class ChattingService {

    final static Logger log = LoggerFactory.getLogger(ChattingService.class);

    final ChatRepository chatRepository;
    final UserRepository userRepository;
    final ChannelRepository channelRepository;

    public void sendMessage(ChatMessageDto request, String channelName) {
        log.info(channelName);
        User user = userRepository.findByNickname(request.getSender()).orElseThrow(() -> NoSuchUserException.EXCEPTION);
        Channel channel = channelRepository.findByChannelName(channelName).orElseThrow(() -> ChannelNotFoundException.EXCEPTION);

        Chat chat = Chat.builder()
            .userId(user.getId())
            .channelId(channel.getId())
            .user(user)
            .channel(channel)
            .message(request.getMessage())
            .build();
        chatRepository.save(chat);
        
    }
}
