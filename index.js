import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { userList, tweetsList } from "./src/app.js";

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.post("/sign-up", (req, res) => {
    userList.push(req.body);
    console.log(req.body);
    res.send("ok");
});

server.post("/tweets", (req, res) => {
   tweetsList.push(req.body);
   console.log(req.body);
   res.send("ok"); 
});

server.get("/tweets", (_, res) => {
    const lastTweets = tweetsList.filter((_, id) => (id <= 10));
    res.send(lastTweets);
});

server.listen(5000);