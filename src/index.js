const config = require("./config/config.json");
const auth = require("./config/auth.json");
const models = require("./lib/models.js");

const Discord = require("discord.js");
const moment = require("moment");
const chalk = require("chalk");
const fs = require("fs");

const client = new Discord.Client(config.clientOptions);
const time = moment().format("HH:mm M/D/Y");

global.MarkovChain = require("purpl-markov-chain");
global.functions = require("./lib/functions.js");
global.GifEncoder = require("gif-encoder");
global.Sequelize = require("sequelize");
global.pluralize = require("pluralize");
global.fetch = require("node-fetch");
global.pms = require("pretty-ms");
global.canvas = require("canvas");
global.qr = require("qrcode");
global.os = require("os");

global.Discord = Discord;
global.config = config;
global.moment = moment;
global.chalk = chalk;
global.auth = auth;
global.fs = fs;

// Set client properties
client.coolDowns = new Map();
client.commands = new Map();
client.events = new Map();
client.databases = models;

// Set up event handler
client.loadEvents = function loadEvents () {
  fs.readdirSync("./events/").forEach(async eventName => {
    delete require.cache[require.resolve(`./events/${eventName}`)];

    const eventFile = require(`./events/${eventName}`);

    eventName = eventName.replace(".js", "");

    // Add event to events map
    client.events.set(eventName, eventFile);

    // Bind event file to run on event
    client.on(eventName, eventFile.bind(null, client));
  });
  console.log(chalk.green(`(${time})`), `Successfully loaded ${client.events.size} events.`);
};

// Set up command handler
client.loadCommands = function loadCommands () {
  fs.readdirSync("./commands/").forEach(category => {
    fs.readdirSync(`./commands/${category}`).forEach(async commandName => {
      delete require.cache[require.resolve(`./commands/${category}/${commandName}`)];

      const commandFile = require(`./commands/${category}/${commandName}`);

      commandName = commandName.replace(".js", "");

      // Add command to commands map
      client.commands.set(commandName, commandFile);

      const command = client.commands.get(commandName);

      // Set command properties
      command.name = commandName;
      command.category = category;

      if (category === "owner") command.ownerOnly = true;
    });
  });
  console.log(chalk.green(`(${time})`), `Successfully loaded ${client.commands.size} commands.`);
};

// Load commands and events
client.loadEvents();
client.loadCommands();

// Login to Discord API
client.login(auth.discord);

// Handle promise rejections
process.on("unhandledRejection", error => console.error(error));

// Take input from stdin
process.stdin.on("data", async data => {
  try {
    console.log(await eval(`(async()=>{${data.toString()}})()`));
  } catch (error) {
    console.error(error.message);
  }
});