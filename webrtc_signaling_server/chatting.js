const WebSocket = require("ws").Server;
// < channelname: string, < username: string, WebSocket: ws > >
const channelInfo = new Map();

const execute = (server) => {
    const wss = new WebSocket({
        server: server,
        path: "/chatting",
    });
    wss.on("connection", (ws) => {
        ws.on("open", () => {});
        ws.on("close", () => {});
        ws.on("message", (msg) => messageHandler(msg));
    });
};

const messageHandler = (data) => {
    const parsedMessage = JSON.parse(data);
};

module.exports = {
    execute,
};
