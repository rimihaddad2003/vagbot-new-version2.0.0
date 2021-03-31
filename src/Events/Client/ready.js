const request = require("request");
const url = "https://api.mcsrvstat.us/2/vagmemes.com";

module.exports = {
  name: "ready",
  run: (client) => {
    client.prestatus = {
      name: "Vagmemes Server!",
      type: "WATCHING",
    };
    setInterval(() => {
      let aftervar = client.prestatus.name;
      if (client.prestatus.name.includes("{mcp}")) {
        request(url, (err, response, body) => {
          if (err) {
            console.log(err);
            return (aftervar = aftervar.replace("{mcp}", "Error"));
          }
          body = JSON.parse(body);
          if (!body.online) aftervar = aftervar.replace("{mcp}", "Offline");
          else aftervar = aftervar.replace("{mcp}", body.players.online);
        });
      }
      if (client.prestatus.name.includes("{dsm}"))
        aftervar = aftervar.replace(
          "{dsm}",
          client.guilds.cache.get(client.prestatus.guild).memberCount
        );
      if (client.prestatus.name.includes("{dso}"))
        aftervar = aftervar.replace(
          "{dso}",
          client.guilds.cache
            .get(client.prestatus.guild)
            .members.cache.filter((u) => u.presence.status !== "offline").size
        );
      setTimeout(() => {
        client.user.setPresence({
          activity: {
            name: aftervar,
            type: client.prestatus.type,
          },
        });
      }, 2000);
    }, 10000);
  },
};
