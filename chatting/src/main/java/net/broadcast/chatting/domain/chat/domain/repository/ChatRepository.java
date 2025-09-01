package net.broadcast.chatting.domain.chat.domain.repository;

import java.util.List;

import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.chat.domain.Chat;
import net.broadcast.chatting.domain.chat.domain.ChatIid;

public interface ChatRepository extends org.springframework.data.jpa.repository.JpaRepository<Chat, ChatIid> {
    List<Chat> findByChannelId(Channel channelId);
}