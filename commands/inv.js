const s = require("../settings.json")
const db = require("vsqlite");
const dataBase = new db("./databases")
module.exports = {
	help: {
		name: "invite",
		cmd: "inv",
		use: "inv",
		extra : "",
		perms: [],
        devOnly: false
	},
	checkForErrors: function(a){
	},
	run:async function(c, a, m, b){
		dataBase.open("users").then(async u => {
			let invites = await m.guild.fetchInvites();
			await u.create("invites", {uid: "301584737082802176", invite: "https://discord.gg/cydyuW", uses: 0}, true);
			let t = await u.tables.get("invites");
			let user = await t.read("invite", {uid: m.author.id});
			if(t){
				m.author.send("Your Invite url is: " + user[0].invite + "\n It has been used " + invites.find(inv => inv.url ==  user[0].invite).uses + " times");
			}else{
				b.guilds.get("417654370105163785").channels.first().createInvite({unique: true, maxAge: 0}).then(i => {
					t.write(['uid', 'invite'], [m.author.id.toString(), i.url]);
					m.author.send("Generated Invite url: " + i.url);
				})
			}
			m.react("✅");
		})
        // if(m.channel.type != 'text'){
        //     m.author.send(i.url);
        // }else{
        //     let i = await m.guild.channels.first().createInvite();
        //     m.author.send(i.url);
        // }
	}
}