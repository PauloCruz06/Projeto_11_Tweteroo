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
    res.sendStatus(201);
});

server.post("/tweets", (req, res) => {
    if(req.body === null || req.headers === null || req.headers.user === ""){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    const user = userList.find((user) => req.headers.user === user.username);
    tweetsList.push({ ...req.body, username: user.username, avatar: user.avatar });
    res.sendStatus(201); 
});

server.get("/tweets", (req, res) => {
    const lastTweets = [ ...tweetsList ];
    const page = req.query.page;
    lastTweets.reverse();
    if(page !== undefined){
        if(page <= "0" || page === ""){
            res.status(400).send("Informe uma página válida!");
        }else{
            res.send(lastTweets.filter((_, id) => (id >= 10*page-10 && id < 10*page)));
        }
    }else{
        res.send(lastTweets.filter((_, id) => id < 10));
    }  
});

server.get("/tweets/:USERNAME", (req, res) => {
    const userTweetsList = tweetsList.filter((user) => req.params.USERNAME === user.username);
    res.send(userTweetsList);
});

server.listen(5000);