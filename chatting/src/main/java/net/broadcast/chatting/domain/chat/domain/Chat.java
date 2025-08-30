package net.broadcast.chatting.domain.chat.domain;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.broadcast.chatting.domain.channel.domain.Channel;
import net.broadcast.chatting.domain.user.domain.User;
import net.broadcast.chatting.global.entity.BaseTimeEntity;

@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@IdClass(ChatIid.class)
@DynamicInsert
@Entity
public class Chat extends BaseTimeEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User userId;

    @Id
    @OneToOne
    @JoinColumn(name = "channel_id", nullable = false)
    Channel channelId;

    @Column(nullable = false, length = 500)
    String message;

    @Builder
    public Chat(
        User userId,
        Channel channelId,
        String message
    ) {
        this.userId = userId;
        this.channelId = channelId;
        this.message = message;
    }
}
