
module.exports = {
  name: 'avatar',
  descriptions: 'Displays a users avatar.',
  parameters: [
    {
      name: 'member',
      type: String
    }
  ],
  aliases: ['pfp', 'a'],
  async execute (client, message, args) {
    const user = message.mentions.users.first() || message.author;

    return message.channel.send(new client.discord.MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(`Avatar of ${user.tag}`)
      .setURL(user.displayAvatarURL({ format: 'png', dynamic: true, size: 256 }))
      .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 256 }))
      .setFooter(user.id)
    );
  }
};