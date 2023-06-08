const {Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, GatewayIntentBits } = require('discord.js');
const serverName = '₊˚꒰﹒♡﹒Kitty Cafe Online!﹒🌸';
const embedColor = 0xFFAED0;
const serverLogo = 'https://cdn.discordapp.com/icons/1017659199381065798/1c21ca4bdacc4e0d3aacbc0cdfb8d7bf.webp';
const embedGif = 'https://media.discordapp.net/attachments/1026695882361536522/1029945882419933235/CREW_SAD_AND_HAPPY__1_CERRADA.gif?width=625&height=351';
const pageNum = 5;
var currentPage = -1;
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// const server = client.servers.find("id", 1017659199381065798);
const pages =[
    //Pag 1
    new EmbedBuilder()
	    .setColor(embedColor)
	    .setTitle('Reglas del Server')
	    .setAuthor({ name: serverName})
	    .addFields(
		    { name: 'Reglas ' + 1 + '/' + pageNum, value: '╭ ‧˚₊ ︵︵︵ ﹕ ︵︵ ꒰ ᕡ⑅ᕠ ꒱ ︵︵ ﹕︵︵︵ ₊˚‧\n'+
                                                          '﹕\n'+
                                                          '╰╮:zheart:˖ ˚ :zzdeco~1: ๋࣭ ⭑ Para @₊˚꒰﹒♡﹒Kitty Café Online!﹒🌸 es muy importante que'+
                                                          ' toda su comunidad online cuente con un espacio completamente seguro y donde'+
                                                          ' su privacidad no corra riesgo, por ende recuerda que﹕\n'+
                                                          '˚ ˖ ﹕\n'+
                                                          '╭╯ :zheart:˖ ˚ :zkittypaw: ๋࣭ ⭑ Esta ***extrictamente prohibido*** burlar, molestar, intimidar, acosar,'+
                                                          'hostigar y/o difamar a otros miembros de la comunidad ya sea dentro o fuera del'+
                                                          'servidor. Así mismo, ***evitarás*** compartir información sensible y/o personal sobre'+
                                                          'los demás ***sea con su consentimiento o no***. Recuerda que el dominio público de'+
                                                          'datos personales puede poner a cualquier persona en riesgo fuera del mundo online.\n'+
                                                          '﹕˖ ˚\n'+
                                                          '╰╮:zheart:˖ ˚ :zpastelitoredvelvet: ๋࣭ ⭑ Dicho esto, a continuación podrás leer las reglas de'+
                                                          'comportamiento general y cómo estas funcionan y regulan tu comportamiento'+
                                                          'dentro del server ︵ ˖ εïз\n'+
                                                          '╭╯\n'+
                                                          '╰ ‧˚₊ ︵︵︵ ﹕ ︵︵ ꒰ ᕡ⑅ᕠ ꒱ ︵︵ ﹕︵︵︵ ₊˚‧'
            },
	    )
	    .setImage(embedGif)
	    .setFooter({ text: serverName + '                                                                  Página ' + 1 + '/' + pageNum}),
    
    //Pag 2
    new EmbedBuilder()
	    .setColor(embedColor)
	    .setTitle('Reglas del Server')
	    .setAuthor({ name: serverName})
	    .setThumbnail(serverLogo)
	    .addFields(
		    { name: 'Reglas ' + 2 + '/' + pageNum, value: '-Reglas que mi bebe escoja ugu' },
		    { name: '\u200B', value: '\u200B' },
	    )
	    .setImage(embedGif)
	    .setFooter({ text: serverName + '                                                                  Página ' + 2 + '/' + pageNum}),

    //Pag 3
    new EmbedBuilder()
	    .setColor(embedColor)
	    .setTitle('Reglas del Server')
	    .setAuthor({ name: serverName})
	    .setThumbnail(serverLogo)
	    .addFields(
		    { name: 'Reglas ' + 3 + '/' + pageNum, value: '-Reglas que mi bebe escoja ugu' },
		    { name: '\u200B', value: '\u200B' },
	    )
	    .setImage(embedGif)
	    .setFooter({ text: serverName + '                                                                  Página ' + 3 + '/' + pageNum}),

    //Pag 4
    new EmbedBuilder()
	    .setColor(embedColor)
	    .setTitle('Reglas del Server')
	    .setAuthor({ name: serverName})
	    .setThumbnail(serverLogo)
	    .addFields(
		    { name: 'Reglas ' + 4 + '/' + pageNum, value: '-Reglas que mi bebe escoja ugu' },
		    { name: '\u200B', value: '\u200B' },
	    )
	    .setImage(embedGif)
	    .setFooter({ text: serverName + '                                                                  Página ' + 4 + '/' + pageNum}),
    //Pag 5
    new EmbedBuilder()
	    .setColor(embedColor)
	    .setTitle('Reglas del Server')
	    .setAuthor({ name: serverName})
	    .setThumbnail(serverLogo)
	    .addFields(
		    { name: 'Reglas ' + 5 + '/' + pageNum, value: '-Reglas que mi bebe escoja ugu' },
		    { name: '\u200B', value: '\u200B' },
	    )
	    .setImage(embedGif)
	    .setFooter({ text: serverName + '                                                                  Página ' + 5 + '/' + pageNum}),
];

class Resources {
  constructor(response, row, currentPage) {
    this.response = response;
    this.row = row;
    this.currentPage = currentPage;
    this.pages = pages;
    this.pageNum = pageNum;
  }
}

let resources = new Resources(null, null, -1);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Provides rules of the server.'),

  async execute(interaction) {
    if (!interaction.user.id == '502621636202070026' && !interaction.user.id == '802312144544464926') {
      await interaction.reply({ content: 'No tienes permiso para usar este comando.', ephemeral: true });
      return;
    }

    const nextPage = new ButtonBuilder()
      .setCustomId('nextPage')
      .setLabel('>')
      .setStyle(ButtonStyle.Secondary);

    const prevPage = new ButtonBuilder()
      .setCustomId('prevPage')
      .setLabel('<')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
      .addComponents(prevPage, nextPage);
      
    var response = await interaction.reply({
      embeds: [pages[++currentPage]],
      components: [row],
      fetchReply: true,
    });
    resources.currentPage = currentPage;
    resources.response = response;
    resources.row = row;
  },
  resources, pages, pageNum,
};