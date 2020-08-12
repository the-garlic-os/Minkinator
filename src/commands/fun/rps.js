module.exports = {
  description: "Play a classic game of rock paper scissors against Minkinator.",
  parameters: [
    {
      name: "choice",
      type: String,
      required: true
    }
  ],
  async execute (client, message, args) {
    const playerChoice = args[0].toLowerCase();
    const choices = ["rock", "paper", "scissors"];

    if (!choices.includes(playerChoice)) return message.channel.send(`\`${playerChoice}\` is not a valid choice.`);
    
    const guildConfig = await client.database.properties.findByPk("configuration").then(key => key.value);
    const defaultColor = guildConfig.colors.default;
    
    const embed = new client.Discord.MessageEmbed()
      .setColor(defaultColor)
      .setTitle("Rock Paper Scissors")

    const { randomInteger, capitalize } = client.functions;
    const computerChoice = choices[randomInteger(0, 2)];

    function sendEmbed (lose) {
      if (lose) {
        embed.setDescription(`${capitalize(computerChoice)} beats ${capitalize(playerChoice)}`);
      } else {
        embed.setDescription(`${capitalize(playerChoice)} beats ${capitalize(computerChoice)}`);
      }
    
      return message.channel.send(embed);
    }

    if (playerChoice === "rock") {
      if (computerChoice === "paper") return sendEmbed(true);
      if (computerChoice === "scissors") return sendEmbed(false);
    } else if (playerChoice === "paper") {
      if (computerChoice === "rock") return sendEmbed(false);
      if (computerChoice === "scissors") return sendEmbed(true)
    } else if (playerChoice === "scissors") {
      if (computerChoice === "rock") return sendEmbed(true);
      if (computerChoice === "paper") return sendEmbed(false);
    }

    embed.setDescription("It's a draw!");

    return message.channel.send(embed);
  }
};