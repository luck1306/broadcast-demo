package net.broadcast.chatting.domain.channel.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.channel.domain.repository.ChannelRepository;
import net.broadcast.chatting.domain.channel.exception.ChannelNotFoundException;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelInfoResponse;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelListResponse;

@RequiredArgsConstructor
@Service
public class ChannelService {

    final ChannelRepository channelRepository;

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
}
