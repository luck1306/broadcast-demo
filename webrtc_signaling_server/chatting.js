const WebSocket = require("ws").Server;
// Map<channelname: string, Array<WebSocket: ws>>
const channelInfo = new Map();

const execute = (server) => {
    const wss = new WebSocket({
        server: server,
        path: "/chatting",
    });
    wss.on("connection", (ws) => {
        ws.on("close", () => closeHandle(ws));
        ws.on("message", (msg) => messageHandler(ws, JSON.parse(msg)));
    });
};

/**
 * signaling server 접속 시... channelName & userId
 */
const messageHandler = (socket, data) => {
    const type = data.type; // "E"(nter), "C"(ommon)
    const cname = data.channelName;
    const name = data.userId;
    const body = data.body;
    console.log(
        `messageHandler: type=${type}, channelName=${cname}, userId=${name}, body=${body}`
    );
    // db에 채팅 추가하는 로직 추가 예정

    if (type === "C") {
        const channelEleArr = channelInfo[cname];
        channelEleArr.forEach((element) => {
            element.send(
                JSON.stringify({
                    name,
                    body,
                })
            );
        });
    } else if (type === "E") {
        channelInfo[cname].push(socket);
    }
};

const closeHandle = (socket) => {
    channelInfo.forEach((cname) => {
        cname.forEach((e) => {
            if (e == socket) e.close();
        });
    });
};

module.exports = {
    execute,
};
