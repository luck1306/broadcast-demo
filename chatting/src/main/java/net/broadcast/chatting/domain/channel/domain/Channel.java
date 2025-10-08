package net.broadcast.chatting.domain.channel.domain;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import net.broadcast.chatting.domain.user.domain.User;

@lombok.Getter
@lombok.NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@jakarta.persistence.AttributeOverride(name = "id", column = @Column(name = "channel_id"))
@DynamicInsert
@jakarta.persistence.Entity
public class Channel extends net.broadcast.chatting.global.entity.BaseEntity {
    @Column(nullable = false, length = 30, unique = true)
    String channelName;

    @Column(nullable = false, columnDefinition = "boolean default false")
    boolean liveStatus;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    User user;

    @lombok.Builder
    public Channel(
        String channelName,
        boolean liveStatus,
        User user
    ) {
        this.channelName = channelName;
        this.liveStatus = liveStatus;
        this.user = user;
    }

    public Channel switchStat(int stat) {
        if (stat == 0) this.liveStatus = false;
        else this.liveStatus = true;
        return this;
    }
}