const s = require("../settings.json")
module.exports = {
	help: {
		name: "Level",
		cmd: "lv",
		use: "lv [the level you want to join]",
		perms: []
	},
	run: function(c, a, m, b){
		if(!a)return m.react("❌❓");
		let lvs = s.levels;
		m.member.removeRoles(m.member.roles);
		m.member.addRole(lvs[a[0]])
	}
}