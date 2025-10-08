package net.broadcast.chatting.domain.channel.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.channel.domain.repository.ChannelRepository;
import net.broadcast.chatting.domain.channel.exception.AlreadyExistChannelException;
import net.broadcast.chatting.domain.channel.exception.ChannelNotFoundException;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelListResponse;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.domain.user.domain.repository.UserRepository;
import net.broadcast.chatting.domain.user.exception.NoSuchUserException;
import net.broadcast.chatting.domain.user.exception.NotLoginCurrentException;

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

    public ChannelListResponse searchByChannelName(String channelName) {
        List<String> cn = channelRepository.findByChannelNameFragment(channelName);
        if (cn.isEmpty()) throw ChannelNotFoundException.EXCEPTION;

        return new ChannelListResponse(cn);
    }

    public String getChannelInfoAboutMe() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getChannel() == null) return "";
        return user.getChannel().getChannelName();
    }

    public void createChannel(String channelName) {
        User u = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (u == null) throw NotLoginCurrentException.EXCPETION;
        if (channelRepository.findByChannelName(channelName).isPresent() || channelRepository.findByUser(u).isPresent()) throw AlreadyExistChannelException.EXCEPTION;
        Channel cn = Channel.builder()
            .channelName(channelName)
            .liveStatus(false)
            .user(u)
            .build();
        channelRepository.save(cn);
    }

    @Transactional
    public void notStreamStat(int stat) {
        UserDetails details = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByNickname(details.getUsername()).orElseThrow(() -> NoSuchUserException.EXCEPTION);
        Channel channel = channelRepository.findByUser(user).orElseThrow(() -> ChannelNotFoundException.EXCEPTION);
        channelRepository.save(channel.switchStat(stat));
    }
}
