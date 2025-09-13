package net.broadcast.chatting.domain.channel.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.channel.domain.repository.ChannelRepository;
import net.broadcast.chatting.domain.channel.exception.ChannelNotFoundException;
import net.broadcast.chatting.domain.channel.presentation.dto.request.ChannelInfoRequest;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelInfoResponse;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelListResponse;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.domain.user.domain.repository.UserRepository;
import net.broadcast.chatting.domain.user.exception.NoSuchUserException;

@RequiredArgsConstructor
@Service
public class ChannelService {

    final ChannelRepository channelRepository;
    final UserRepository userRepository;

    public ChannelListResponse getAllChannelList() {
        List<Channel> channels = channelRepository.findAll();
        List<String> s = channels.stream()
            .map(Channel::getChannelName)
            .toList();
        return new ChannelListResponse(s);
    }

    public ChannelListResponse getOnAirChannels() {
        List<Channel> channels = channelRepository.findAllByLiveStatus(true);
        return new ChannelListResponse(
            channels.stream()
                .map(Channel::getChannelName)
                .toList()
        );
    }

    public ChannelInfoResponse searchByChannelName(String channelName) {
        Channel cn = channelRepository.findByChannelName(channelName).orElseThrow(() -> ChannelNotFoundException.EXCEPTION);
        return new ChannelInfoResponse(cn);
    }

    public void createChannel(ChannelInfoRequest request) {
        User u = userRepository.findByNickname(request.getUserName()).orElseThrow(() -> NoSuchUserException.EXCEPTION);
        Channel cn = Channel.builder()
            .channelName(request.getChannelName())
            .liveStatus(false)
            .user(u)
            .build();
        channelRepository.save(cn);
    }

    public void notStreamStat() {
        UserDetails details = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByNickname(details.getUsername()).orElseThrow(() -> NoSuchUserException.EXCEPTION);
        Channel channel = channelRepository.findByUser(user).orElseThrow(() -> ChannelNotFoundException.EXCEPTION);
        channelRepository.save(channel.switchStat());
    }
}
