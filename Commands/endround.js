module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (gameData["ingame"] != true) { return; }
    if (devs.indexOf(id) == -1) { return; }
    gameData["ingame"] = false;

    //dm all scores
    for (var guy in gameData["players"]) {
        functions.dmUser(guy, "You have **" + gameData["players"][guy]["score"] + "** points.")
    }

    //get round winner
    let winners = []
    let c = 0
    let max = -1
    for (var guy in gameData["submissions"]) {
        if (gameData["submissions"][c][2] = max) {
            winners.push(gameData["submissions"][c][0]);
        } else if (gameData["submissions"][c][2] > max) {
            winners = [gameData["submissions"][c][0]]
            max = gameData["submissions"][c][2]
        }
        c += 1
    }
    let text = ""
    for (var winner in winners){
        text += "<@" + winner + "> "
    }
    text += "won the round."
    gameData["rounds"].push([winners])
    functions.sendMessage(bot.channels.get('668330311733739541'), text)
}