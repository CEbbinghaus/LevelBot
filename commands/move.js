const s = require("../settings.json")
module.exports = {
	help: {
		name: "Move",
		cmd: "mv",
		use: "mv [Mention of the person] [The level number you want to move to]",
		extra : "the max level is 10",
		perms: ["KICK_MEMBERS"],
        devOnly: false
	},
	checkForErrors: function(a){
		if(parseInt(a[0]) > 10)return "The Max Level is 10";
		else return this.help.use;
	},
	run:function(c, a, m, b){
		if(!m.member.hasPermission(this.help.perms))return m.react(":p:");
		let user = m.mentions.first();
		console.log(a);
		if(!a || isNaN(parseInt(a[0])) || parseInt(a[0]) > 10)return m.react("❌").then(() => m.react("❓"));
		let lvs = s.levels;
		user.member.removeRoles(m.member.roles.filterArray(v => {return lvs[parseInt(v.name.split(" ")[1])]})).then(() => {
			user.member.addRole(lvs[a[0]]);	
		})
	}
}