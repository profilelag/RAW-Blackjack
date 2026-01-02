import { Database } from "bun:sqlite";
import { createServer, Socket } from "node:net";
import { BlackjackGame } from "./game.js";
import _ from "lodash"

const db = new Database("users.db");

const server = createServer((socket: Socket) => {
    console.log("Client connected");
    var info = {
        token: "",
        game: null,
    }
    socket.write("21 Blackjack Server");
    socket.on("data", (d) => {
        const commandSplit: string[] = d.toString().trim().split(" ")
        const command: string = commandSplit[0]
        const [, ...args] = commandSplit

        console.log("Received:", command);
        console.log("Args: " + args.join(" "))
    });
    socket.on("end", () => {
        console.log("Client disconnected");
    });
});
server.listen(23)
server.on("error", (err) => {
    console.log(err)
})