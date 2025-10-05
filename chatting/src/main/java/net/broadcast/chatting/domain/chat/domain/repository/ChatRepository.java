package net.broadcast.chatting.domain.chat.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;

import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.chat.domain.Chat;
import net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageDto;

public interface ChatRepository extends org.springframework.data.jpa.repository.JpaRepository<Chat, Long> {
    List<Chat> findByChannelId(Channel channelId);
    @Query("SELECT "+ 
        "new net.broadcast.chatting.domain.chat.presentation.dto.ChatMessageDto(c.user.nickname, c.message) " +
        "FROM Chat c " +
        "WHERE c.channel = :channel " +
        "AND c.createdAt >= :minimumTime " +
        "ORDER BY c.createdAt DESC " +
        "LIMIT 20")
    List<ChatMessageDto> enterChannelWithRecently(Channel channel, LocalDateTime minimumTime);
}