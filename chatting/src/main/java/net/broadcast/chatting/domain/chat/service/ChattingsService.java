package net.broadcast.chatting.domain.chat.service;

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
public class ChattingsService {

    final ChatRepository chatRepository;
    final UserRepository userRepository;
    final ChannelRepository channelRepository;

    public ChatMessageDto sendMessage(ChatMessageDto request, String channelName) {
        User user = userRepository.findByNickname(request.getSender()).orElseThrow(() -> NoSuchUserException.EXCEPTION);
        Channel channel = channelRepository.findByChannelName(channelName).orElseThrow(() -> ChannelNotFoundException.EXCEPTION);

        Chat chat = Chat.builder()
            .userId(user)
            .channelId(channel)
            .message(request.getMessage())
            .build();
        chatRepository.save(chat);
        return request;
    }

    public String getChannelName(String channelName) {
        Channel cn = channelRepository.findByChannelName(channelName).orElseThrow(() -> ChannelNotFoundException.EXCEPTION);
        chatRepository.findByChannelId(cn).forEach(e -> System.out.println(e));
        return channelName;
    }
}
