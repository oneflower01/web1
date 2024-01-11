import http from "http"
import {Server} from "socket.io";
import express from 'express'
import path from 'path'
const __dirname = path.resolve()


const app = express()

app.set("view engine", "pug")
app.set("views", __dirname + "/src/views")
app.use("/public", express.static(__dirname + "/src/public"))
app.get("/", (req, res) => res.render("home"))
app.get("/*", (req, res) => res.redirect("/"))


const httpServer = http.createServer(app)
const wsServer = new Server(httpServer)
const roomname = "신세경사단"

wsServer.on("connection", (socket)=>{
    socket.on("enter_room", (done)=>{
        done()
        socket.join(roomname)
        socket.to(roomname).emit("welcome")
    })
    socket.on("new_message", (msg, done) => {
        socket.to(roomname).emit("new_message", msg)
        done()
    })
})


const handleListen = () => console.log("Listening on http://...3000")
httpServer.listen(3000, handleListen)