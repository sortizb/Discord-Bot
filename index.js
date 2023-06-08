// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, ButtonBuilder, ButtonStyle} = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const {resources, pages, pageNum} = require('./commands/utility/rules.js');

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	}
	else if (interaction.isButton) {
		try {
			switch (interaction.customId) {
				case 'nextPage':
					if (resources.currentPage >= pageNum-1) {
						await interaction.reply({content: '', fetchReply: true,});
						return;
					}
					
					resources.currentPage = resources.currentPage + 1;

					if (resources.currentPage === pageNum-1) {
						const verify = new ButtonBuilder()
							.setCustomId('verify')
							.setLabel('Verify')
							.setStyle(ButtonStyle.Success);
						resources.row.addComponents(verify);
					}
					await resources.response.edit({ 
						embeds: [pages[resources.currentPage]],
						components: [resources.row],
						fetchReply: true,
					});
					await interaction.reply({content: '', fetchReply: true,});
				break;

				case 'prevPage':
					if (resources.currentPage <= 0) {
						await interaction.reply({content: '', fetchReply: true,});
						return;
					}
					if (resources.currentPage === pageNum-1) {
						const prev = resources.row.components.at(0);
						const next = resources.row.components.at(1);
						resources.row.setComponents(prev, next);
					}
					resources.currentPage = resources.currentPage - 1;
					await resources.response.edit({ 
						embeds: [pages[resources.currentPage]],
						components: [resources.row],
						fetchReply: true,
					});
					await interaction.reply({content: '', fetchReply: true,});
				break;

				case 'verify':
					resources.currentPage = 0;
					const prev = resources.row.components.at(0);
					const next = resources.row.components.at(1);
					resources.row.setComponents(prev, next);
					await resources.response.edit({ 
						embeds: [pages[resources.currentPage]],
						components: [resources.row],
						fetchReply: true,
					});
					var role= interaction.member.guild.roles.cache.find(role => role.name === "୨୧﹒Leí y acepte las reglas 🌸﹒୨୧");
					interaction.member.roles.add(role);
					await interaction.reply({content: 'Felicitaciones! Estas verificada en Kitty Cafe Online. Bienvenida!', ephemeral: true, fetchReply: true,});
				break;

				default: break;
			}
		} catch (e) {console.log(e)};
	} 
});