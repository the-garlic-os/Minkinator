module.exports = {
  description: 'Resets a members data.',
  permissions: ['ADMINISTRATOR'],
  aliases: ['demolish', 'destroy', 'obliterate', 'disintegrate'],
  parameters: [
    {
      name: 'member',
      type: String,
      required: true
    }
  ],
  async execute (client, message, args) {
    const member = message.mentions.users.first();
    const data = await client.model.members.findByPk(member.id);

    await data.destroy();
    await client.model.members.create({ name: member.tag, id: member.id });

    return message.channel.send(`${member.tag}'s data has been reset.`);
  }
};