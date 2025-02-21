module.exports = {
  description: "Change guild settings.",
  permissions: ["ADMINISTRATOR"],
  aliases: ["gc"],
  parameters: [
    {
      name: "key",
      type: String
    },
    {
      name: "value"
    }
  ],
  async execute (_, message, [ key, value ]) {
    const guildConfig = await global.sequelize.models.guildConfig.findByPk(message.guild.id);

    delete guildConfig.dataValues.guildId;

    const embed = new Discord.MessageEmbed({
      color: guildConfig.colors.default,
      title: "Guild Configuration"
    });

    if (key) {
      if (!guildConfig[key]) return message.reply(`\`${key}\` does not exist in the guild configuration.`);

      if (typeof(guildConfig[key]) === "object");

      await guildConfig.update({ [key]: value });

      embed.setDescription(`Successfully set \`${key}\` to \`${value}\`.`);
    } else {
      embed.setDescription(`\`\`\`json\n${JSON.stringify(guildConfig.dataValues, null, 2)}\`\`\``);
    }

    return message.reply(embed);
  }
};