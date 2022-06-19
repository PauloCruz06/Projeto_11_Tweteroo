import express from "express";
import cors from "cors";
import validUrl from "valid-url";

import { userList, tweetsList } from "./src/app.js";

const server = express();
server.use(express.json());
server.use(cors());

server.post("/sign-up", (req, res) => {
    if(req.body === null || req.body.username === "" || req.body.avatar === ""){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    if(!validUrl.isUri(req.body.avatar)){
        res.status(400).send("Imagem inválida");
    }
    userList.push(req.body);
    console.log(userList);
    res.sendStatus(201);
});

server.post("/tweets", (req, res) => {
    if(req.body === null || req.body.username === "" || req.body.tweet === ""){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    const user = userList.find((user) => req.headers.user === user.username);
    tweetsList.push({ ...req.body, username: user.username, avatar: user.avatar });
    res.sendStatus(201); 
});

server.get("/tweets", (_, res) => {
    const lastTweets = [ ...tweetsList ];
    lastTweets.reverse();
    res.send(lastTweets.filter((_, id) => (id < 10)));
});

server.get("/tweets/:USERNAME", (req, res) => {
    const userTweetsList = tweetsList.filter((user) => req.params.USERNAME === user.username);
    res.send(userTweetsList);
});

server.listen(5000);