package net.broadcast.chatting.domain.chat.domain.repository;

import net.broadcast.chatting.domain.chat.domain.Chat;
import net.broadcast.chatting.domain.chat.domain.ChatIid;

public interface ChatRepository extends org.springframework.data.jpa.repository.JpaRepository<Chat, ChatIid> {
    
}