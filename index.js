const settings = require("./settings.json");
const {Client} = require("discord.js");
let Bot = new Client();

Bot.on("ready", () => {
	console.log("im ready");
	Bot.guilds.forEach(g => {
		g.roles.forEach(r => {
			console.log(r.id, r.name);
		})
	})
})

Bot.on("message", m => {
	if(m.author.bot)return;
	if(!m.content.startsWith(settings.prefix) || !m.content.endsWith(settings.suffix))return;
	let args = m.content.split(settings.prefix.length, m.content.length - settings.suffix.length).split(" ");
	let command = args.shift();
	try{
		let cmh = require(`./commands/${commmand}.js`);
		cmh.run(command, args, m, Bot);
	}catch(err){
		m.react("❌");
		console.log(err);
	}
})

Bot.login(settings.token)

