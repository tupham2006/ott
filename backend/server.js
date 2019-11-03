const express  = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

var $ = {
  data: {
    sessions: {},
    clients: {},
    games: [null]
  }
};

$.Common = require('./modules/Common');
$.basePath = __dirname;
const Auth = require('./modules/Auth')($);
const Chat = require('./modules/Chat')($);
const Game = require('./modules/Game')($);

/**
 * Http
 */
let server = new express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
  .use('/', require('./routes')($, Game))
  .listen(8081);

/**
 * Socket IO
 */
$.io = require('socket.io').listen(server);
$.io.on("connection", (socket) => {
  // Authenticate
  Auth.startSession(socket);
  Chat.getChatList(socket);

  // Handle disconnect
  socket.on('disconnect', () => {
    let client = $.data.clients[socket.id];
    if(client) {
      $.data.sessions[client.id].is_online = 0;
      delete $.data.clients[socket.id];
    }
  });
  socket.on("updateUser", payload =>{ Auth.updateUser(socket, payload); });

  // Play game
  socket.on("inviteGame", payload => { Game.inviteGame(socket, payload); });
  socket.on("acceptInvite", payload => { Game.acceptInvite(socket, payload); });
});
