const express = require("express");
const app = express();
const sessionManager = require("./controller/SessionManager.js");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/UserRoute.js");

app.use(bodyParser.json());


app.use("/user", userRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "internal error"
    });
});

app.listen(3000, () => {
    console.log("App listenging to port 3000");
});
