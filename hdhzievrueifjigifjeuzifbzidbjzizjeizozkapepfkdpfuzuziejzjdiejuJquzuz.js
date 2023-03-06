const Discord = require('discord.js');
const client = new Discord.Client({ intents: Discord.Intents.ALL });
const fetch = require('node-fetch');

client.on('ready', () => {
  console.log(`Le bot est connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '+sherlock') {
    await message.channel.send('Entrez un nom d\'utilisateur :');

    const filter = (m) => m.author.id === message.author.id;
    const username = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] });

    await message.channel.send(`Recherche de profils publics pour ${username.first().content}...`);

    const sites = [
      'https://www.instagram.com',
      'https://www.facebook.com',
      'https://twitter.com',
      'https://www.youtube.com/user',
      'https://www.tiktok.com',
      'https://www.snapchat.com/add',
      'https://www.pinterest.com',
      'https://www.twitch.tv',
      'https://www.reddit.com/user',
      'https://www.linkedin.com/in'
    ];
    const foundSites = [];

    for (const site of sites) {
      const url = `${site}/${username.first().content}`;
      const response = await fetch(url);

      console.log(`Site: ${site}, Response Code: ${response.status}, Response Text: ${await response.text()}`);

      if (response.status === 200 && username.first().content.toLowerCase() in (await response.text()).toLowerCase()) {
        foundSites.push(site);
      }
    }

    if (foundSites.length) {
      const sitesStr = foundSites.join('\n');
      await message.channel.send(`L'utilisateur a été trouvé sur les sites suivants : \n${sitesStr}`);
    } else {
      await message.channel.send(`L'utilisateur n'a pas été trouvé sur les sites spécifiés.`);
    }
  }
});

client.login('MTA1NTg2ODY2NzA3MTU3NDAzNw.GZkvbn._SjkCkQnkk0akNHJOiMi6VUPfFVi3jl9QxD6bs');
