const discord = require('discord.js');
require('dotenv').config();

const logChannel = '843564412324413501';
const commandsChannel = '843564389466374165';
const rolesChannel = '843530990721695745';

const prefix = '!';

const welcome = require('./welcome');
const checkstreaming = require('./checkstreaming');

const bot = new discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
bot.commands = new discord.Collection();

const fs = require('fs');
const commandFiles = 
        fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on('message', (message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command == 'ping'){
    bot.commands.get('ping').execute(message, args);
  }

  if(command == 'reactionrole'){
    bot.commands.get('reactionroles').execute(message, args, discord, bot);
  }

});

bot.on('ready', () => {
  bot.channels.cache.get(logChannel).send('Cricket is online!');
  bot.channels.cache.get(logChannel).send("Registering Reaction Listeners...").then(sent => {
  bot.commands.get('reactionroles').execute(sent, ["registerer"], discord, bot);
  });  
  welcome(bot);
  checkstreaming(bot);
});
bot.login(process.env.BOT_LOGIN);