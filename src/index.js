const {
  Client,
  Intents,
  Collection
} = require("discord.js");
const {
  promisify
} = require("util");
const config = require("../config.json");
const glob = require("glob");
const globPro = promisify(glob);
const {
  MongoClient
} = require("salvage.db");
const client = new Client({
  ws: {
    intents: Intents.ALL,
  },
});

client.bettercase = (word) =>
word[0].toUpperCase() + word.slice(1).toLowerCase();
client.prefix = config.prefix;
client.botname = config.name;
client.color = config.color;
client.owner = config.owner;
client.commands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();
client.categories = new Set();
client.db = new MongoClient({
  mongoURI:
  process.env.MONGO,
  schema: {
    name: "Data",
  },
});

(async () => {
  const EventsFiles = await globPro(`${__dirname}/Events/**/*.js`);
  const CommandsFiles = await globPro(`${__dirname}/Commands/**/*.js`);

  EventsFiles.forEach((value) => {
    try {
      const file = require(value);
      if (!file.name) throw new Error("Missing File.name");
      if (typeof file.name !== "string")
        throw new Error("File.name must be a string");
      client.events.set(file.name, file);
      client.on(file.name, file.run.bind(null, client));
      console.log(`[🔵] - ${value.split("/").pop()}`);
    } catch (err) {
      console.log(`[🔴] - ${value.split("/").pop()} (${err.message})`);
    }
  });
  CommandsFiles.forEach(async (value) => {
    try {
      const file = require(value);
      if (!file.name) throw new Error("Missing File.name");
      if (typeof file.name !== "string")
        throw new Error("File.name must be a string");
      if (!file.desc) throw new Error("Missing File.desc");
      if (typeof file.desc !== "string")
        throw new Error("File.desc must be a string");
      if (!file.cooldown) throw new Error("Missing File.cooldown");
      if (typeof file.cooldown !== "number")
        throw new Error("File.cooldown must be a number");
      client.commands.set(file.name, file);
      if (file.aliases)
        file.aliases.map((value) => client.aliases.set(value, file.name));
      if (file.category) {
        if (typeof file.category !== "string")
          throw new Error("File.category must be a string");
        client.categories.add(client.bettercase(file.category));
      } else throw new Error("Missing File.category");
      if (!file.run) throw new Error("Missing File.run");
      if (typeof file.run !== "function")
        throw new Error("File.run must be a function");
      if (!(await client.db.get(`${file.name}_maint`)))
        await client.db.set(`${file.name}_maint`, "no");
      if ((await client.db.get(`${file.name}_maint`)) == "yes")
        throw new Error("Maintenance");
      console.log(`[🔵] - ${file.name}`);
    } catch (err) {
      console.log(`[🔴] - ${value.split("/").pop()} (${err.message})`);
    }
  });
})();

client.login(process.env.TOKEN);
