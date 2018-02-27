const s = require("../settings.json")
module.exports = {
	help: {
		name: "Level",
		cmd: "lv",
		use: "lv [the level number you want to join]",
		extra : "the max level is 10",
		perms: []
	},
	checkForErrors: function(a){
		if(parseInt(a[0]) > 10)return "The Max Level is 10";
		else return this.help.use;
	},
	run:function(c, a, m, b){
		console.log(parseInt(a[0]))
		if(!a || isNaN(parseInt(a[0])) || parseInt(a[0]) > 10)return m.react("❌").then(() => m.react("❓"));
		let lvs = s.levels;
		m.member.removeRoles(m.member.roles.filterArray(v => {return lvs[parseInt(v.name.split(" ")[1])]})).then(() => {
			m.member.addRole(lvs[a[0]]);	
		})
	}
}