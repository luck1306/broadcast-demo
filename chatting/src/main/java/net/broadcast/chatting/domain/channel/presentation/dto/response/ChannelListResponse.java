package net.broadcast.chatting.domain.channel.presentation.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChannelListResponse {
    List<String> channelNames;
}
