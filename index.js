import express from "express";
import cors from "cors";

import { userList, tweetsList } from "./src/app.js";

const server = express();
server.use(express.json());
server.use(cors());

server.post("/sign-up", (req, res) => {
    userList.push(req.body);
    res.send("OK");
});

server.post("/tweets", (req, res) => {
    const avatar = userList.find((user) => req.body.username === user.username);
    tweetsList.push({...req.body, avatar: avatar.avatar});
    res.send("OK"); 
});

server.get("/tweets", (_, res) => {
    const lastTweets = tweetsList.filter((_, id) => (id <= 10));
    res.send(lastTweets);
});

server.listen(5000);