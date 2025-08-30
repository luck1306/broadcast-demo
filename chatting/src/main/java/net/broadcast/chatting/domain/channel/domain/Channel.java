package net.broadcast.chatting.domain.channel.domain;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Column;

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

    @lombok.Builder
    public Channel(
        String channelName,
        boolean liveStatus
    ) {
        this.channelName = channelName;
        this.liveStatus = liveStatus;
    }
}
    