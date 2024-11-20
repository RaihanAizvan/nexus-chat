import express from "express";
import path from "path"


//!import socket.io which is a webrtc framework
import {Server} from "socket.io"
//todo for commonjs use require const io = require("socket.io")(server)..... pass http server as argument


const port = 8002
const app = express()



//static files
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "public")))

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



//*create a socket.io server and pass out http server as a argument.
//*this will allow us to use socket.io with express

const io = new Server(server)




//* this is a  set that will store the details of the conencted sockets

let socketsConnected = new Set()



/*
* this is a event listener for when a client connects to the server through socket.io
* when a client connects to the server, the callback function is executed
* io.on means that we are listening for a connection event from the client.
*/

io.on("connection", onConnected)


/*
* this is a callback function that is executed when a client connects to the server
* the socket object has a unique id that is used to identify the client
* socket object also has methods like emit, on, disconnect,etc which we can use to communicate with the client
? @param socket is a object that represents the connection to the client
*/

function onConnected(socket){
    console.log("Socket Connected with id: ", socket.id);
    
    //* add the socket id to the set of connected sockets so that we can keep track of the connected sockets
    socketsConnected.add(socket.id);


    //* emit the total number of connected sockets to all the clients. 
    io.emit("clients-total" , socketsConnected.size)



    //* socket.on = is a method that is used for listening for a specific event from the client
    socket.on("disconnect", () => {

        console.log("Socket Disconnected with id: ", socket.id);
        
        
        //* remove the socked id from the set
        socketsConnected.delete(socket.id);


        //* emit the total number of connected sockets to all the clients. 
        io.emit("clients-total" , socketsConnected.size)
    })

    socket.on("message" , (data)=>{
        socket.broadcast.emit("recieving-message" , data)
    })

    socket.on("typing" , (data)=>{
        socket.broadcast.emit("typing" , data)
    })

}