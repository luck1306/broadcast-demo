import { Dispatch, SetStateAction } from "react";

type SessionDescription = {
    type: "answer" | "offer" | "pranswer" | "rollback";
    sdp?: string;
};

type SdpBody = {
    sdp: SessionDescription;
    sender: string;
}

type SetState<T> = Dispatch<SetStateAction<T>>;

export type OnAnswerProps = {
    body: SdpBody;
    setCallBtnDisabled: SetState<boolean>;
    setHangUpBtnDisabled: SetState<boolean>;
    localIceCandidateOffer: LocalIceCandidateOfferProps;
    handleMessage: HandleMessageProps;
};

export type JoinProps = {
    channelName: string;
    userId: string;
    setJoinBtnDisabled: SetState<boolean>;
    setCallBtnDisabled: SetState<boolean>;
    socket: WebSocket;
};

export type HangUpOnClickProps = {
    setHangUpBtnDisabled: SetState<boolean>;
    setCallBtnDisabled: SetState<boolean>;
    setSendBtnDisabled: SetState<boolean>;
};

export type SendOnClickProps = {
    sendMessage: string;
    setSendMessage: SetState<string>;
};

export type CloseDataChannelProps = {
    setSendBtnDisabled: SetState<boolean>;
};

export type GotRemoteDescriptionProps = {
    answer: SessionDescription;
};

export type HandleMessageProps = {
    setReceiveMessage: SetState<string>;
    setSendMessage: SetState<string>;
    setSendBtnDisabled: SetState<boolean>;
};

export type LocalIceCandidateOfferProps = {
    userId: string;
    socket: WebSocket;
    channelName: string;
};

export type CallOnClickProps = {
    localIcecandidateOffer: LocalIceCandidateOfferProps;
    handleMessage: HandleMessageProps;
    setCallBtnDisabled: SetState<boolean>;
    setHangUpBtnDisabled: SetState<boolean>;
};
