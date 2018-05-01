const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: []})
	.write();

var bot = new Discord.Client();
var prefix = ("/");
var randnum = 0;

var storynumber = db.get('histoires').map('story_value').value


bot.on('ready', () => {
	bot.user.setPresence({ game: { name: '[/help] bot tuto', type: 0}});
	console.log("Bot Ready !");
});

bot.login('NDM5NzMzODEwNzA4NjExMDcy.DcXdlA.u-rLpx3JnqqeXCdjEb0pQ6wqpcQ');

bot.on('message', message => {
	if (message.content === "ping"){
		message.reply("pong");
		console.log("ping pong");
	}

	if(!message.content.startsWith(prefix)) return;
	var args = message.content.substring(prefix.length).split(" ")

	switch (args[0].toLowerCase()){

		case "newstory":
		var value = message.content.substr(10);
		var author = message.author.toString;
		var number = db.get('histoires').map('id').value();
		console.log(value);
		message.reply("Ajout del'histoire à la base de données")

		db.get('histoires')
			.push({story_value: value, story_author: author})
			.write();
		break;

		case "tellstory" :

		story_random();
		console.log(randnum);

		var story = db.get(`histoires[${randnum}].story_value`).toString().value();
		var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
		console.log(story);

		message.channel.send(`Voici l'histoire : ${story} (Histoire de ${author_story})`)

		break;
	}

	if(message.content === prefix + "help"){
		var help_embed = new Discord.RichEmbed()
			.setColor('#00F719')
			.addField("Commandes du bot !", "	-/help : Affiche les commandes du bot !")
			.addField("Interaction", "ping : le bot répond pong !")
			.setFooter("C'est tout pour ce embed !")
		message.channel.sendEmbed(help_embed);
		//message.channel.sendMessage("Voici les commandes du bot :\n -/help pour afficher les commandes");
		console.log("Commabd Help demandée !");
	}



	if (message.content === "Comment vas-tu cosmicBot?"){
		random();

		if (randnum == 3){
			console.log(randnum);
		}

		if (randnum == 1){
			message.reply("(Réponse numéro 1), Merci je vais très bien !");
			console.log(randnum);
		}

		if (randnum == 2){
			message.reply("(Réponse numéro2), Je ne vais pas très bien merci de te soucier de moi !");
			console.log(randnum);
		}
	}
});

function story_random(min, max) {
	min = Math.ceil(1);
	max = Math.floor(storynumber);
	randnum = Math.floor(Math.random() * (max - min +1) + min);
}

function random(min, max) {
	min = Math.ceil(0);
	max = Math.floor(3);
	randnum = Math.floor(Math.random() * (max - min +1) + min);
}

