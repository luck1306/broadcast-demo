const WebSocket = require("ws").Server;
let channels = {};
let hostList = {}; /** Object<{ channelName: userId }> */

function init(server) {
  const wss = new WebSocket({
    server: server,
    path: "/signal",
  });
  wss.on("connection", (socket) => {
    // debug("A client has connected!");

    // socket.on("error", debug);
    socket.on("message", (message) => onMessage(wss, socket, message));
    socket.on("close", (code, reason) => onClose(wss, socket, code, reason));
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

function clearClient(wss, socket, reason) {
  // clear client by channel name and user id
  console.log("remove socket in channels");
  Object.keys(channels).forEach((cname) => {
    Object.keys(channels[cname]).forEach((uid) => {
      if (channels[cname][uid] === socket) {
        delete channels[cname][uid];
        if (reason === "S" || hostList[cname] === uid) delete hostList[cname];
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
      if (channels[channelName] || hostList[channelName]) {
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
    // case "quit": {
    //   // quit channel
    //   console.log("User", userId, "quitted channel", channelName);
    //   if (channels[channelName]) {
    //     channels[channelName][userId] = null;
    //     const userIds = Object.keys(channels[channelName]);
    //     if (userIds.length === 0) {
    //       delete channels[channelName];
    //     }
    //   }
    //   break;
    // }
    case "send_offer": {
      console.log("User", userId, "sent offer to channel", channelName);
      // exchange SDP(Session Description Protocol) to peer
      const sdp = body.sdp;
      const hostId = hostList[channelName];
      const wsClient = channels[channelName][hostId];
      if (wsClient === undefined || wsClient === null) break;
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
      if (sender != undefined) {
        // console.log(sender);
        // streamer only
        send(
          channels[channelName][sender],
          "ice_candidate_received",
          candidate
        );
      } else {
        Object.keys(hostList).forEach((cname) => {
          const hostId = hostList[cname];
          if (cname === channelName) {
            // console.log(`host is ${hostId}`);
            send(channels[channelName][hostId], "ice_candidate_received", {
              candidate,
              sender: userId,
            });
          }
        });
      }
      break;
    }
    default:
      break;
  }
}

function onClose(wss, socket, code, reason) {
  // 강제 종료 시 1001
  console.log("onClose", code, reason.toString());
  clearClient(wss, socket, reason.toString());
}

module.exports = {
  init,
  channels,
  hostList,
};
