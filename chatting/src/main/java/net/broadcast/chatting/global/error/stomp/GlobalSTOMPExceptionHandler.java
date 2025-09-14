package net.broadcast.chatting.global.error.stomp;

import org.slf4j.Logger;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.ControllerAdvice;

import net.broadcast.chatting.global.error.ErrorResponse;


@ControllerAdvice
public class GlobalSTOMPExceptionHandler {

    final static Logger log = org.slf4j.LoggerFactory.getLogger(GlobalSTOMPExceptionHandler.class);

    @SendTo("/sub/error")
    @MessageExceptionHandler({ StompCustomException.class })
    ErrorResponse stompCustunExceptionHandler(StompCustomException e) {
        StompErrorCode errorCode = e.getErrorCode();
        log.info(
            "[{}] - {}",
            errorCode.getStateCode(),
            errorCode.getMessage()
        );
        return new ErrorResponse(errorCode);
    }

    @SendTo("/sub/error")
    @MessageExceptionHandler({ Exception.class })
    ErrorResponse exceptionHandler(Exception e) {
        log.error("{}", e.getMessage());
        return new ErrorResponse(StompErrorCode.INTERNAL_SERVER_ERROR); 
    }

}
