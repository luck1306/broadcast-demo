/**
 * originally created by: https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7
 */
const app = require("express")();
const fs = require("fs");
const path = require("path");
const server = require("https").createServer(
    {
        cert: fs.readFileSync(path.join(__dirname, "./app.pem")),
        key: fs.readFileSync(path.join(__dirname, "./app-key.pem")),
    },
    app
);
const debug = require("debug")(`${process.env.APPNAME}:app`);
const signaling = require("./signaling");
// const chatting = require("./chatting");

const HTTPPORT = 4040;

app.set("trust proxy", true);

app.use((req, res, next) => {
    if (req.secure || req.get("X-Forwarded-Proto" === "https")) {
        return next();
    }
    res.redirect("https://" + req.headers.host + req.url);
});

app.use((req, res, next) => {
    res.setTimeout(30000);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

signaling.init(server);
// chatting.execute(server);

app.get("/channels", (req, res) => {
    const response = {
        channels: Object.keys(signaling.channels).map((channelName) => ({
            channelName,
            users: Object.keys(signaling.channels[channelName]),
        })),
    };
    res.json(response);
});

app.get("/hostList", (req, res) => {
    res.json({ hostList: signaling.hostList });
});

// init the http server on 4040
server.listen(HTTPPORT, () => {
    debug(`${process.env.APPNAME} is running on port: ${HTTPPORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
    server.close((err) => {
        if (err) {
            debug(err);
            process.exit(1);
        } else process.exit(0);
    });
});
