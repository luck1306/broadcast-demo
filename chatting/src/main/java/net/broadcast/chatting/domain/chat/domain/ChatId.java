package net.broadcast.chatting.domain.chat.domain;

import java.util.UUID;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatId implements java.io.Serializable {

    @Column(name = "channel_id", nullable = false)
    UUID channelId;
    @Column(name = "user_id", nullable = false)
    UUID userId;
}
