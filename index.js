const settings = require("./settings.json");
const {Client} = require("discord.js");
const db = require("vsqlite");
const dataBase = await new db("./databases").open("users.sqlite");
let Bot = new Client();

const handleMessage = m => {
	if(m.author.bot)return;
	if(!m.content.startsWith(settings.prefix) || !m.content.endsWith(settings.suffix))return;
	let args = m.content.slice(settings.prefix.length, m.content.length - settings.suffix.length).split(" ");
	let command = args.shift().toLowerCase();
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

Bot.on("guildMemberAdd",async mem => {
	let i = await mem.guild.fetchInvites()
	let p = await dataBase.create("invites", {link: "https://discord.gg/cydyuW", uses: 1}, true);
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