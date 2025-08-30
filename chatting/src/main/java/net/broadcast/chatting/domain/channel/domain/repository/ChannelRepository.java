package net.broadcast.chatting.domain.channel.domain.repository;

import java.util.List;
import java.util.Optional;

import net.broadcast.chatting.domain.channel.domain.Channel;

public interface ChannelRepository extends org.springframework.data.jpa.repository.JpaRepository<Channel, java.util.UUID> {
    List<Channel> findAllByLiveStatus(boolean liveStatus);
    Optional<Channel> findByChannelName(String channelName);
}
