/*
* this is a client side scripp that will connect to the server using socket.io
*/
/*
* initializing socket.io client for connecting to the server
*it takes two parameters: 
* 1. the url of the server
* 2. options object
* by default it will connect to the server using the same protocol as the page(windows.location) == location of the index.html file
* the options object can be used to specify additional settings for the socket connection
* such as reconnection, reconnection attempts, timeout, and auto connect
* the port number is the port number of our server
*/

/* 
* the io() function returns a socket object which we can use to communicate with the server.
* the second argument is an options object which we can use to specift additional setting for the socke connection
* currecly we dont need that so we pass an empty object.
* if you want to learn more about the options object, check on https://socket.io/docs/v4/client-options/
* if you want to give another url to connect to, you can do it like this:
* const socket = io("http://another-server-url:8001", {})
* 
*/
const socket = io()


//* changing the clients-total in frontend
const clientsTotal = document.getElementById("clients-total")
const messageContainer = document.getElementById("message-container")
const nameInput = document.getElementById("name-input")
const messageForm = document.getElementById("message-form")
const messageInput = document.getElementById("message-input")
const feedbackElement = document.getElementById("feedback")

const randomNames = ["Soman" , "Sasi" , "Janu" , "Lalettan" , "Sundaran" , "Sundari" , "Meenu" , "Janaki" , "Tovino" , "SuperMan"]
const randomTyping = ["entho type cheyan..." , "type cheyan...." , "pani on the way..." , "typing aan..." ]

nameInput.value = randomNames[Math.floor(Math.random() * randomNames.length)]


messageForm.addEventListener("submit" , (e) =>{
    e.preventDefault()

    //* calling the sendMessage function
    sendMessage()
})



/* 
* This method is used to listen for a specifiv event from the server.......
* the first argument is the event name that is writenn in the backend alsoooo
* the second argument is a callback function that is executed when the event is triggerd
* the event will trigger when the server emits the event
* the function server passing will look like this: socket.emit("event-name" , data)
* so we can access the data like this in the frontend: socket.on("event-name" , (data) =>{})
*/

socket.on("clients-total" , (data)=>{
    //* changint the client total in the frontend
    clientsTotal.textContent = data
})


function sendMessage(){ 


    //* check for empty message and whitespace

    if(messageInput.value.trim() === "" || messageInput.value === null){
        return
    }


    //* creating a data object that will be sent to the server
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }), // formated date
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
    }

    //* sending the message to the server
    socket.emit("message" , data)

    //* adding the message to the ui
    //* this is the message that we send to the server so first argument is true
    addMessageToUi(true , data)

    //* emptying the message input
    messageInput.value = null


}

socket.on("recieving-message" , (data)=>{
    addMessageToUi(false , data)
})


function addMessageToUi(isOwnMessage , data ){


    const senderElement = 


    `   <div class="px-2 py-2 pb-1 bg-3 rounded-lg flex flex-col shadow mb-2 max-w-xs self-end" id="sender-message-container">
            <div>
                <p class="text-white font-semibold text-xs text-green-600" id="sender-name">${data.name}</p>
            </div>
            <div>
                <p class="text-white text-xs pr-6 break-all" id="sender-message-content">${data.message}</p>
            </div>
            <div class="flex flex-row self-end ">
                <p class="text-white text-xxs  mx-2" id="sender-message-time">${data.time}</p>
                <p class="text-white text-xxs " id="sender-message-sent"></p>
                <p class="text-white text-xxs " id="sender-message-delivered"></p>
            </div>
        </div>
    `;




    const receiverElement = 
    `
        <div class="px-2 py-2 pb-1 bg-4 rounded-lg flex flex-col shadow mb-2 max-w-xs self-start" id="reciever-message-container">
            <div>
                <p class="text-white font-semibold text-xs text-pink-800" id="reciever-name">${data.name}</p>
            </div>
            <div>
                <p class="text-white text-xs pr-6 break-all" id="reciever-message-content">${data.message}</p>
            </div>
            <div class="flex flex-row self-end ">
                <p class="text-white text-xxs  mx-2" id="reciever-message-time">${data.time}</p>
            </div>
        </div>
    `

    messageContainer.innerHTML += isOwnMessage ? senderElement : receiverElement

    //* scrolling to the bottom of the message container
    scrollToBottom()


   
}

function scrollToBottom() {
    // Ensure the message container scrolls smoothly to the bottom
    messageContainer.scrollTo({
      top: messageContainer.scrollHeight,
      behavior: 'smooth', // Optional: Use 'auto' for instant scrolling
    });
  
    // Keep the input field focused without causing a "bobbing" effect
    if (document.activeElement !== nameInput) {
        messageInput.focus();
    }

    
}


messageInput.addEventListener("focus" , (e)=>{
    socket.emit("typing" , {
        feedback: `${nameInput.value} ${randomTyping[Math.floor(Math.random() * randomTyping.length)]}`
    })
      
})


messageInput.addEventListener("keypress" , (e)=>{
    socket.emit("typing" , {
        feedback: `${nameInput.value} ${randomTyping[Math.floor(Math.random() * randomTyping.length)]}`
    })
})



messageInput.addEventListener("blur" , (e)=>{
    socket.emit("typing" , {
        feedback: ""
    })
})

//handle typing on mobile phone keyboard
messageInput.addEventListener("input" , (e)=>{
    socket.emit("typing" , {
        feedback: `${nameInput.value} ${randomTyping[Math.floor(Math.random() * randomTyping.length)]}`
    })
})


socket.on("typing" , (data)=>{
    feedbackElement.innerHTML = `<p class="text-sm text-gray-400" id="feedback">${data.feedback}</p>`
})