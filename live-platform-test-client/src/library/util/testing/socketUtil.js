let socket = null;

// ws:///localhost:8080/binary
function socketInit(props) {
    console.log(props.serverUrl);
    socket = new WebSocket(props.serverUrl);
    socket.onopen = (event) => {
        console.log("WebSocket is open now.");
    };
    
    socket.onmessage = (event) => {
        console.log("Message from server ", event.data);
    };
    
    socket.onclose = (event) => {
        console.log("WebSocket is closed now.");
    };
    
}

function socketDisconnect() {
    socket.close();
}

function socketSendMessage(props) {
    socket.send(props.message);
    props.setMessage("");
}

export { socketInit, socketDisconnect, socketSendMessage };
