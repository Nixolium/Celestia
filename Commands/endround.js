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
    let max = -1
    for (let c = 0; c < gameData["submissions"].length; c++) {
        if (gameData["submissions"][c][2] == max) {
            winners.push(gameData["submissions"][c][0]);
        } else if (gameData["submissions"][c][2] > max) {
            winners = [gameData["submissions"][c][0]]
            max = gameData["submissions"][c][2]
        }
    }
    let text = ""
    for (var winner in winners) {
        text += "<@" + winners[winner] + "> "
    }
    text += "won the round."    

    gameData["rounds"].push(winners)
    functions.sendMessage(bot.channels.get('668330311733739541'), text)

    
    for (let r = 0; r < gameData["submissions"].length; r++) {
        functions.sendMessage(bot.channels.get('671046194515935242'), gameData["submissions"][r][1] + "\n" + "Made by: <@" + gameData["submissions"][r][0] + ">")
    }
}