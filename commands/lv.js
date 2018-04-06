const s = require("../settings.json")
module.exports = {
	help: {
		name: "Level",
		cmd: "lv",
		use: "lv [the level number you want to join]",
		extra : "the max level is 10",
		perms: [],
        devOnly: false
	},
	checkForErrors: function(a){
		if(parseInt(a[0]) > 10)return "The Max Level is 10";
		else return this.help.use;
	},
	run:function(c, a, m, b){
		if(!a || isNaN(parseInt(a[0])) || parseInt(a[0]) > 10)return m.react("❌").then(() => m.react("❓"));
		let lvs = s.levels;
		//Wlet lv = /\d+/.exec(a.join())[1]
		let f = m.member.roles.filterArray(v => {
			let n = /\d+/.exec(v.name);
			return n == null ? false : (lvs[n[0]] == v.id);
		});
		m.member.removeRoles(f).then(() => {
			m.member.addRole(lvs[a[0]]);	
		})
	}
}