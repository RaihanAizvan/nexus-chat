# Nexus-Chat

Nexus-Chat is a lightweight, real-time chat application built using **Node.js**, **Socket.IO**, and plain **HTML/JavaScript**. It enables users to exchange messages instantly, making it an excellent project for learning the basics of real-time communication.

---

## Features

- **Real-Time Messaging**: Send and receive messages instantly using WebSocket technology powered by Socket.IO.
- **Lightweight Architecture**: Built with minimal dependencies and simple design.
- **Responsive Design**: Works seamlessly across desktop and mobile browsers.
- **Customizable**: Easily extendable to add features like authentication, message history, or file sharing.

---

## Installation

Follow these steps to set up and run Nexus-Chat locally:

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nexus-chat.git
   cd nexus-chat
2. **Install dependancies**:
   ```bash
   npm install express socket.io
3. **Start the Server**:
   ```bash
   node server.js
4. **Open the browser and navigate to**:
   ```bash
   http://localhost:8002
  ---
## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Socket.IO**: Real-time communication library.
- **HTML/CSS/JavaScript**: Frontend structure and behavior.

---

## How It Works

- **Server Setup**: The Node.js server uses Socket.IO to manage WebSocket connections.
- **Real-Time Communication**: Clients connect to the server and exchange messages in real time.
- **Dynamic Updates**: Messages are broadcast to all connected clients without refreshing the page.

---

## Future Enhancements

- Add user authentication.
- Store chat history using a database.
- Enable private messaging.
- Support file and media sharing.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
4. Push the branch:
   ```bash
   git push origin feature-name
5. Open a pull request
---
## Acknowledgements

Special thanks to the creators of:

- **Socket.IO**
- **Node.js**

  


