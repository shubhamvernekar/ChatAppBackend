// const pg = require("pg");
// const conString = "postgres://fbuvntil:pGtukBAndeAa0LLp0F5114_YjizmF1xT@flora.db.elephantsql.com/fbuvntil";

// var client = new pg.Client(conString);



const users = [
    {
        id: "Mr.A",
        name: "A for apple",
        phoneNo: "771892"
    },
    {
        id: "Mr.B",
        name: "B for Ball",
        phoneNo: "89893"
    }
];

const conversitions = [];
const messages = {};

function checkPreset(userId) {
    for(let user of users) {
        if(user.id == userId) return true;
    }
    return false;
}

function getConversitionId(user1, user2) {
    const conversitionId = conversitions.find(ele => {
        return (ele.user1 == user1 && ele.user2 == user2) ||
            (ele.user2 == user1 && ele.user1 == user2);
    });

    return conversitionId;
}

function createUser(userId, name, phoneNo) {
    return new Promise((resolve, reject) => {

        if(checkPreset(userId)) reject("user already present");

        users.push({
            userId: userId,
            name: name,
            phoneNo: phoneNo
        });

        resolve("User inserted successfully");
    });
}

function createMessage(from, to, message) {
    let conversitionId = getConversitionId(from, to);

    return new Promise((resolve, reject) => {
        if(!checkPreset(from) || !checkPreset(to)) reject("user not registered");
        if(!conversitionId) {
            conversitionId = crypto.randomUUID();
            conversitions.push({
                user1: from,
                user2: to,
                conversitionId: conversitionId
            });
        }

        if(!messages[conversitionId])  messages[conversitionId] = [];

        messages[conversitionId].push({
            from: from,
            to: to,
            date: Date.now(),
            message: message
        });

        resolve("message inserted success");
    });
}

function getAllConversition(user) {
    return new Promise((resolve, reject) => {
        const myConversitions = conversitions.filter(ele => {
            ele.user1 == user || ele.user2 == user;
        });

        resolve(myConversitions);
    });
}

function getConversition(conversitionId) {
    return new Promise((resolve, reject) => {
        const myConversition = messages[conversitionId];

        if(!myConversition) reject("invalid conversitionId provided");
        resolve(myConversition);
    });
}


module.exports = {
    createUser,
    createMessage,
    getAllConversition,
    getConversition
};
