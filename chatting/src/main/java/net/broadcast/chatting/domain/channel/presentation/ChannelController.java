package net.broadcast.chatting.domain.channel.presentation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelInfoResponse;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelListResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RequiredArgsConstructor
@RequestMapping("/channels")
@RestController
public class ChannelController {
    
    final net.broadcast.chatting.domain.channel.service.ChannelService channelService;
    
    @GetMapping("/all")
    public ChannelListResponse getAllChannelList() {
        return channelService.getAllChannelList();
    }

    @GetMapping("/onair")
    public ChannelListResponse getOnAirChannels() {
        return channelService.getOnAirChannels();
    }
    
    @GetMapping("/search/{channelName}")
    public ChannelInfoResponse searchByChannelName(@PathVariable String channelName) {
        return channelService.searchByChannelName(channelName);
    }
    
}
