module.exports = async (client, guild) => {
  console.log(`Minkinator has left ${guild.name} (${guild.id})`);
  await client.models[guild.name].sequelize.drop();
  await client.fs.unlinkSync(`./data/${guild.name}.sqlite`);
};

// it doesnt work of course.