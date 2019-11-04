module.exports = ($) => {
  return {
    unix: () => {
       return Date.now() + Math.random();
    },
    cookie: (cookie) => {
      let list = {};
      cookie && cookie.split(';').forEach(function(cookie) {
        let parts = cookie.split('=');
        try {
          list[parts.shift().trim()] = JSON.parse(decodeURIComponent(parts.join('=')));
        } catch (e) {
          list[parts.shift().trim()] = decodeURIComponent(parts.join('='));
        }
      });

      return list;
    },
    userBySocket: (socket) => {
      let sessions = $.data.sessions;
      let userId = $.data.clients[socket.id].id;
      return sessions[userId];
    },
    newId: async (table) => {
      let data = await table.findOne().sort({ id: -1 }).exec();
      let id = data ? (data.id + 1) : 1;
      return id;
    }
  }
};

