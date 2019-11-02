module.exports = {
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
};

