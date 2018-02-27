const settings = require("./settings.json");
const {Client} = require("discord.js");
let Bot = new Client();

const handleMessage = m => {
	if(m.author.bot)return;
	if(!m.content.startsWith(settings.prefix) || !m.content.endsWith(settings.suffix))return;
	let args = m.content.slice(settings.prefix.length, m.content.length - settings.suffix.length).split(" ");
	let command = args.shift();
	try{
		let cmh = require(`./commands/${command}.js`);
		cmh.run(command, args, m, Bot);
	}catch(err){
		m.react("❌");
		console.log(err);
	}
}

Bot.on("ready", () => {
	console.log("im ready");
})

Bot.on("message", m => {
	handleMessage(m)
})

Bot.on("messageUpdate", (om, nm) => {
	handleMessage(nm);
})

Bot.on("messageReactionAdd", (r, u) => {
	if(u.bot)return;
	if(r.emoji.name == "❓" && r.message.author.id == u.id){
		try{
			let a = r.message.content.slice(settings.prefix.length, r.message.content.length - settings.suffix.length).split(" ");
			let c = a.shift();
			let cmh = require(`./commands/${c}.js`);
			r.message.channel.send(u + "\n" + cmh.checkForErrors(a));
		}catch(err){}
	}
})

process.on('unhandledRejection', console.error)

Bot.login(settings.token)