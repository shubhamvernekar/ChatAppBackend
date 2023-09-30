const express = require("express");
const router = express.Router();
const DB = require("../models/DB.js");

router.post("/create", async (req, res) => {
    const userId = req.body.userId;
    const phoneNo = req.body.phoneNo;
    const name = req.body.name;

    DB.createUser(userId, name, phoneNo).then(result => {
        res.status(200).json({
            "message": "User inserted success"
        });
    }).catch(error => {
        res.status(500).json({
            "message": "fail to insert user"
        });
    });
});

module.exports  = router;
