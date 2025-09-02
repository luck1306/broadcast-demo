package net.broadcast.chatting.domain.channel.presentation.dto.request;

import lombok.Getter;

@Getter
public class ChannelInfoRequest {
    String channelName;
    String userName; // net.broadcast.chatting.domain.user.domain.User.nickname
}
