package net.broadcast.chatting.domain.channel.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.user.domain.User;

public interface ChannelRepository extends org.springframework.data.jpa.repository.JpaRepository<Channel, java.util.UUID> {
    List<Channel> findAllByLiveStatus(boolean liveStatus);
    Optional<Channel> findByChannelName(String channelName);
    Optional<Channel> findByUser(User user);
    
    @Query("SELECT c FROM Channel c WHERE c.channelName LIKE %:channelName%")
    List<Channel> findByChannelNameFragment(String channelName);
}
