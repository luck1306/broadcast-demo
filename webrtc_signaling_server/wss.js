const WebSocket = require("ws").Server;
let channels = {};
let hostList = {}; /** Object<{ channelName: userId }> */

function init(server) {
    const wss = new WebSocket({
        server: server,
        path: "/ws",
    });
    wss.on("connection", (socket) => {
        // debug("A client has connected!");

        // socket.on("error", debug);
        socket.on("message", (message) => onMessage(wss, socket, message));
        socket.on("close", (message) => onClose(wss, socket, message));
    });
}

function send(wsClient, type, body) {
    // debug("ws send", body);
    wsClient.send(
        JSON.stringify({
            type,
            body,
        })
    );
}

function clearClient(wss, socket) {
    // clear client by channel name and user id
    console.log("remove socket in channels");
    Object.keys(channels).forEach((cname) => {
        Object.keys(channels[cname]).forEach((uid) => {
            if (channels[cname][uid] === socket) {
                if (hostList[cname][uid] === channels[cname][uid]) delete hostList[cname];
                delete channels[cname][uid];
            }
        });
    });
}

function onMessage(wss, socket, message) {
    // debug(`onMessage ${message}`);
    const parsedMessage = JSON.parse(message);
    const type = parsedMessage.type;
    const body = parsedMessage.body;
    const channelName = body.channelName;
    const userId = body.userId;

    switch (type) {
        case "join": {
            // join channel
            console.log(`${userId} joined channel ${channelName}`);
            if (channels[channelName]) {
                channels[channelName][userId] = socket;
            } else {
                channels[channelName] = {};
                channels[channelName][userId] = socket;
                hostList[channelName] = userId;
            }
            const userIds = Object.keys(channels[channelName]);
            send(socket, "joined", userIds);
            break;
        }
        case "quit": {
            // quit channel
            console.log("User", userId, "quitted channel", channelName);
            if (channels[channelName]) {
                channels[channelName][userId] = null;
                const userIds = Object.keys(channels[channelName]);
                if (userIds.length === 0) {
                    delete channels[channelName];
                }
            }
            break;
        }
        case "send_offer": {
            console.log("User", userId, "sent offer to channel", channelName);
            // exchange SDP(Session Description Protocol) to peer
            const sdp = body.sdp;
            const hostId = hostList[channelName];
            const wsClient = channels[channelName][hostId];
            send(wsClient, "offer_sdp_received", { sdp, sender: userId });
            break;
        }
        case "send_answer": {
            console.log("User", userId, "sent answer to channel", channelName);
            // exchange SDP(Session Description Protocol) to peer
            const sdp = body.sdp;
            const sender = body.sender;
            const wsClient = channels[channelName][sender];
            send(wsClient, "answer_sdp_received", sdp);
            break;
        }
        case "send_ice_candidate": {
            console.log("User", userId, "sent ICE candidate to channel", channelName);
            const candidate = body.candidate;
            const sender = body.sender; // streamer only
            if (sender != undefined)  // streamer only
                send(channels[channelName][sender], "ice_candidate_received", candidate);
            else {
                Object.keys(hostList).forEach((cname) => {
                    const hostId = hostList[cname];
                    if (cname === channelName) 
                        send(channels[channelName][hostId], "ice_candidate_received", candidate);
                });
            }
            break;
        }
        default:
            break;
    }
}

function onClose(wss, socket, message) {
    console.log("onClose", message);
    clearClient(wss, socket);
}

module.exports = {
    init,
    channels,
    hostList,
};
