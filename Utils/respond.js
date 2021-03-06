let functions = require('./functions.js')
module.exports = function (message) {
	let sender = message.author;
	let sendername = message.author.username;
	let id = message.author.id;
	let msg = message.content.toUpperCase();
	if (message.author.bot) return;
	//Autoresponders
	if (msg === 'SORANO') {
		functions.sendMessage(message.channel, "Please don't ping Sorano. Let her tinker in peace.");
	}
	else if (msg === 'NIX') {
		functions.sendMessage(message.channel, "Nix has been pinged!");
	}
	else if (msg === 'Hello') {
		functions.sendMessage(message.channel, "Good Day!");
	}
	else if (msg === '._.' && id != "536622022709608468") {
		functions.sendMessage(message.channel, '.-.');
	}
	else if (msg === '.-.' && id != "536622022709608468") {
		functions.sendMessage(message.channel, '._.');
	}
	else if (msg === ':/' && id != "536622022709608468") {
		functions.sendMessage(message.channel, ':\\');
	}
	else if (msg === ':\\' && id != "536622022709608468") {
		functions.sendMessage(message.channel, ':/');
	}
	else if (msg === 'WHO AM I') {
		functions.sendMessage(message.channel, 'You are: ' + sendername + "#" + message.author.discriminator);
	}
	else if (msg === 'PREFIX') {
		functions.sendMessage(message.channel, "Celestia's Prefix is + `" + defaultPrefix + "`");
	}
	else if (msg === 'NO U') {
		functions.sendMessage(message.channel, "No, " + sendername + ". **YOU**.");
	}
	else if (message.content === '<:start:670439275158044682>') {
		functions.sendMessage(message.channel, "<:start:670439275158044682>");
	}
	
}