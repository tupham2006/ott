const express  = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
var $ = {
  data: {
    sessions: {},
    clients: {},
    games: [null]
  },
  db: mongoose,
  modules: {},
  models: {}
};

$.basePath = __dirname;
const Auth = $.modules.Auth = require('./modules/Auth')($);
const Chat = $.modules.Chat = require('./modules/Chat')($);
const Game = $.modules.Game = require('./modules/Game')($);
$.Common = require('./modules/Common')($);

/**
 * Http
 */
process.on('uncaughtException', function(err) {
  console.log("Server:\n", err);
});

let server = new express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors({
    credentials: true,
    origin: true,
    methods: "GET,POST",
  }))
  .use('/', require('./routes')($, Game))
  .listen(8081);
$.db.connect('mongodb://localhost:27017/ott', { useNewUrlParser: true, useUnifiedTopology: true });
$.db.connection.on('error',() => {
  console.log("Error in database connection")
});
$.db.connection.once('open',function(){
  console.log("DB connection established");
});

$.models.User = require($.basePath + '/models/User')($);
$.models.Background = require($.basePath + '/models/Background')($);
$.models.Troller = require($.basePath + '/models/Troller')($);
$.models.Game = require($.basePath + '/models/Game')($);

// Seeding
$.Common.seed();
/**
 * Socket IO
 */
$.io = require('socket.io').listen(server);
$.io.on("connection", (socket) => {
  // Authenticate
  Auth.startSession(socket);
  Chat.getChatList(socket);

  // Handle disconnect
  socket.on('disconnect', async () => {
    let client = $.data.clients[socket.id];
    if(client) {
      await $.models.User.updateOne({id: client.id}, {is_online: 0}).exec();
      delete $.data.clients[socket.id];
      await $.modules.Chat.getChatList();
    }
  });
  socket.on("updateUser", payload =>{ Auth.updateUser(socket, payload); });

  // Play game
  socket.on("inviteGame", payload => { Game.inviteGame(socket, payload); });
  socket.on("acceptInvite", payload => { Game.acceptInvite(socket, payload); });
  socket.on("selectTroller", payload => { Game.selectTroller(socket, payload); });
  socket.on("selectBackground", payload => { Game.selectBackground(socket, payload); });
  socket.on("setReadyGame", payload => { Game.setReadyGame(socket, payload); });
});
