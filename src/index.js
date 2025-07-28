import http from "http";
import dotenv from "dotenv";
import Middleware from "./middleware.js";

dotenv.config();

const PORT = process.env.PORT;

const Server = http.createServer((req, res) => {
    Middleware(req, res, () => {
        if (req.url === "/") {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "This is the home page!",
            }));
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