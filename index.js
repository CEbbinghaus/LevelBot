const settings = require("./settings.json");
const {Client} = require("discord.js");
const db = require("vsqlite");
let Bot = new Client();

const handleMessage =async m => {
	if(m.author.bot)return;
	if(!m.content.startsWith(settings.prefix) || !m.content.endsWith(settings.suffix))return;
	let a = await Bot.fetchApplication()
	let args = m.content.slice(settings.prefix.length, m.content.length - settings.suffix.length).split(" ");
	let command = args.shift().toLowerCase();
	try{
		let cmh = require(`./commands/${command}.js`);
		if(cmh.help.devOnly){
			if(m.author.id != a.owner.id)return;
		}
		cmh.run(command, args, m, Bot);
	}catch(err){
		m.react("❌");
		console.log(err);
	}
}

Bot.on("ready", async () => {
	var dataBase = await new db("./databases").open("users");
	console.log("im ready");
})

Bot.on("message", m => {
	handleMessage(m)
})

Bot.on("messageUpdate", (om, nm) => {
	handleMessage(nm);
})

Bot.on("guildMemberAdd",async mem => {
	console.log(dataBase)
	let i = await mem.guild.fetchInvites()
	let t = await dataBase.listTables().then(t => t.get("invites"));
	console.log(t);
	
	i.map()
})

Bot.on("messageReactionAdd", (r, u) => {
	if(u.bot)return;
	if(r.emoji.name == "❓" && r.message.author.id == u.id){
		let a = r.message.content.slice(settings.prefix.length, r.message.content.length - settings.suffix.length).split(" ");
		let c = a.shift().toLowerCase();
		try{
			let cmh = require(`./commands/${c}.js`);
			r.message.channel.send(u + "\n" + cmh.checkForErrors(a));
		}catch(err){
			r.message.channel.send(`${u}\nthere is no command with the name ${c}`);
		}
	}
})

process.on('unhandledRejection', console.error)

Bot.login(settings.token)