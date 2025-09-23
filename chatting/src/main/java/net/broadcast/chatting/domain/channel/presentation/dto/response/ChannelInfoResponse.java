package net.broadcast.chatting.domain.channel.presentation.dto.response;

import java.util.List;
import java.util.stream.Collectors;

import net.broadcast.chatting.domain.channel.domain.Channel;

import lombok.Getter;

@Deprecated
@Getter
public class ChannelInfoResponse {

    final List<ChannelInfo> channels;

    public ChannelInfoResponse(List<Channel> channels) {
        this.channels = channels.stream()
                .map(ChannelInfo::new)
                .collect(Collectors.toList()); // or .toList() on Java 16+
    }

    @Getter
    public static class ChannelInfo {
        final String channelName;
        final boolean liveStatus;

        public ChannelInfo(Channel channel) {
            this.channelName = channel.getChannelName();
            this.liveStatus = channel.isLiveStatus();
        }
    }
}
