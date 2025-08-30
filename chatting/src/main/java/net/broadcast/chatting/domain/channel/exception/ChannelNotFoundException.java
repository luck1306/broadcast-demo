package net.broadcast.chatting.domain.channel.exception;

import net.broadcast.chatting.global.error.CommonCustomException;

public class ChannelNotFoundException extends CommonCustomException {
    public static final ChannelNotFoundException EXCEPTION = new ChannelNotFoundException();

    private ChannelNotFoundException() {
        super(net.broadcast.chatting.global.error.ErrorCode.CHANNEL_NOT_FOUND);
    }
    
}
