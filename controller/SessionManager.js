const webSocket = require("ws");
const wss = new webSocket.Server({ port: 433 });
const DB = require("../models/DB.js");

const clientWSMap = new Map();


function sendMessage(from, to, message) {
    DB.createMessage(from, to, message).then(data => {
        if(clientWSMap.has(to)) {
            clientWSMap.get(to).send(message);
        }
    }).catch(error => {
        console.log(error)
    });
}

async function join(message, ws) {
    const userId = message.userId;

    if(!userId) return;

    clientWSMap.set(userId, ws);

    const conversitions = await DB.getAllConversition(userId);

    ws.send(JSON.stringify(conversitions));
}

wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        console.log("message = " + msg);
        const message = JSON.parse(msg);

        switch(message.type) {
            case "JOIN":
                join(message, ws);
                break;
            case "SEND":
                sendMessage(message.userId, message.to, message.data);
                break;
        }
    });
});
