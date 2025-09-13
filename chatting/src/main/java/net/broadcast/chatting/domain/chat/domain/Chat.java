package net.broadcast.chatting.domain.chat.domain;

import java.util.UUID;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.global.entity.BaseTimeEntity;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@IdClass(ChatId.class)
@DynamicInsert
@Entity
public class Chat extends BaseTimeEntity {

    @Id
    @Column(name = "user_id")
    UUID userId;

    @Id
    @Column(name = "channel_id")
    UUID channelId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id", insertable = false, updatable = false)
    Channel channel;

    @Column(nullable = false, length = 500)
    String message;

    @Builder
    public Chat(
        UUID userId,
        UUID channelId,
        User user,
        Channel channel,
        String message
    ) {
        this.userId = userId;
        this.channelId = channelId;
        this.user = user;
        this.channel = channel;
        this.message = message;
    }
}
