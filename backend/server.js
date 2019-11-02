const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const server = new express()
  .use(bodyParser.json())
  .use(cors())
  .use(cookieParser())
  .listen(8081);
const io = require('socket.io').listen(server);

/**
 * Start Hander
 */
var $ = {
  io: io,
  data: {
    sessions: {},
    clients: {},
    games: [null]
  }
};

$.Common = require('./modules/Common');
const Auth = require('./modules/Auth')($);
const Chat = require('./modules/Chat')($);
const Game = require('./modules/Game')($);

$.io.on("connection", (socket) => {
  // Authenticate
  Auth.startSession(socket);
  Chat.getChatList(socket);

  // Handle disconnect
  socket.on('disconnect', () => { delete $.data.clients[socket.id]; });
  socket.on("updateUser", payload =>{ Auth.updateUser(socket, payload); });

  // Play game
  socket.on("inviteGame", payload => { Game.inviteGame(socket, payload); });
  socket.on("acceptInvite", payload => { Game.acceptInvite(socket, payload); });
});

