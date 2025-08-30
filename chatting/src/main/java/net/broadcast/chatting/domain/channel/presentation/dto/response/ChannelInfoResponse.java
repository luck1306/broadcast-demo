package net.broadcast.chatting.domain.channel.presentation.dto.response;

import java.util.UUID;

import net.broadcast.chatting.domain.channel.domain.Channel;

@lombok.Getter
public class ChannelInfoResponse {
    String channelName;
    UUID channelId;
    boolean liveStatus;

    @lombok.Builder
    public ChannelInfoResponse(String channelName, UUID channUuid, boolean liveStatus) {
        this.channelName = channelName;
        this.channelId = channUuid;
        this.liveStatus = liveStatus;
    }

    public ChannelInfoResponse(Channel channel) {
        this.channelName = channel.getChannelName();
        this.channelId = channel.getId();
        this.liveStatus = channel.isLiveStatus();
    }
}