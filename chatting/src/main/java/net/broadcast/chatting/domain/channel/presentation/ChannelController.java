package net.broadcast.chatting.domain.channel.presentation;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.broadcast.chatting.domain.channel.presentation.dto.response.ChannelListResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


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
    
    @GetMapping("/search")
    public ChannelListResponse searchByChannelName(@RequestParam String query) {
        return channelService.searchByChannelName(query);
    }

    @GetMapping("/info")
    public String getChannelInfoAboutMe() {
        return channelService.getChannelInfoAboutMe();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void createChannel(@RequestParam String channelName) {
        channelService.createChannel(channelName);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/stream")
    public void notStreamStat(@RequestParam int stat) {
        channelService.notStreamStat(stat);
    }
    
}
