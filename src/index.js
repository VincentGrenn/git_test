import http from "http";
import dotenv from "dotenv";
import Middleware from "./middleware.js";
import Data from "./data.js";

dotenv.config();

const PORT = process.env.PORT;

const Server = http.createServer((req, res) => {
    Middleware(req, res, () => {
        if (req.url === "/") {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "This is the home page!",
            }));
            return;
        } else if (req.url === "/secret") {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "How did you find this?",
            }));
            return;
        } else if (req.url === "/data") {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(Data);
            return;
        } else if (req.url.match(/\/data\/(\w+)/)) {
            const Person = req.url.split("/")[2];
            if (Data[Person]) {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(Data[Person]));
            } else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({
                    message: "Person not found!",
                }));
            }
            return;
        }
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({
            message: "Route not found!",
        }));
    });
});

Server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});