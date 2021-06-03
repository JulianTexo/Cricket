module.exports = {
    name: 'memberCount',
    description: 'this command returns the number of members on the server',
    execute(message, bot){
        message.channel.send(`We have ${message.guild.memberCount} members on the server!`);
    }
}