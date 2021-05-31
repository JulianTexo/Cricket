const { Presence } = require("discord.js");

module.exports = (bot) => {
  bot.on("presenceUpdate", (oldPresence, newPresence) => {
    //Hardcoded guild not a good way of doing it, but works for now
    //Guild ID for Biomutant Server 843523725152485407
    const guildid = "843523725152485407";
    guild = bot.guilds.cache.get(guildid);
    //this requires that a streaming role does exist.
    role = guild.roles.cache.find((r) => r.name === "Streaming");
    if (!newPresence.activities) return false;
    let lenghtvar = newPresence.activities.length;
    newPresence.activities.forEach((activity) => {
      if (activity.name === "Twitch" && activity.state === "Biomutant") {
        console.log(new Date().toLocaleString());
        newPresence.member.roles.add(role).catch(console.error);
        console.log(newPresence.member.user.tag + " assigned Stream Role");
      } else {
        newPresence.member.roles.remove(role).catch(console.error);
      }
    });
    if (newPresence.activities.length == 0) {
      newPresence.member.roles.remove(role).catch(console.error);
    }
    console.log();
  });
};
