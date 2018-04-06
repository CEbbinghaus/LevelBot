const s = require("../settings.json")
module.exports = {
	help: {
		name: "generate",
		cmd: "gen",
		use: "gen [EVENT_NAME]",
		extra : "",
        perms: [],
        devOnly: true
	},
	checkForErrors: function(a){
	},
	run:function(c, a, m, b){
        b.emit(a[0], m.member);
        m.react("✅")
	}
}