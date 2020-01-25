module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (gameData["ingame"] != true) { return; }
    if (gameData["queue"].indexOf(id) != -1) {
        functions.replyMessage(message, "You are in the queue. Please wait for the next round to start.")
        return;
    }
    if (gameData["players"][id] == undefined) {
        functions.replyMessage(message, "You are not in the game. Use `$join` to join it.")
        return;
    }
    if (gameData["submissions"].length < 1) {
        functions.replyMessage(message, "There's nothing to vote for!")
        return;
    }
    /*if (gameData["ingame"] == true) {
        functions.replyMessage(message, "The round is still running.")
        return;
    }*/
    if (words.length != 2) {
        functions.replyMessage(message, "Use the following syntax: `$vote [Entry#]`")
        return;
    } else if (gameData["players"][id]["vote"] != false) {
        functions.replyMessage(message, "You already voted for " + gameData["players"][gameData["players"][id]["vote"]]["name"] + ".")
    } else {
        min = 0;
        max = gameData["submissions"].length
        words[1] = parseInt[words[1]]

        //vote added
        if (parseInt(words[1])==words[1] && words[1] > min && words[1] <= max) {
            if (gameData["submissions"][words[1] - 1][0] == id) {
                functions.replyMessage(message, "You can't vote for yourself!")
                return;
            }
            gameData["players"][id]["vote"] = words[1]
            votedId = gameData["submissions"][words[1] - 1][0]
            gameData["submissions"][words[1] - 1][2] += 1;
            functions.replyMessage(message, "You voted for **" + gameData["players"][gameData["players"][id]["vote"]]["name"] + "**.")

            //are all votes in?
            for (var x in gameData["players"]) {
                if (gameData["players"][x].vote == false){
                    return;//nope, we return
                }
            }
            //all votes are in
            functions.sendMessage(bot.channels.get('668330311733739541'), "All votes have been cast. An admin will `$endround`")
        }else{
            functions.replyMessage(message, "Are you sure you sent a valid entry number?")
        }
    }
}