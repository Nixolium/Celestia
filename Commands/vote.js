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
    /*if (gameData["submissions"].length < 1) {
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
        let min = 0;
        let max = gameData["submissions"].length
        //words[1] = Math.floor(parseInt[words[1]])

        //vote added
        target = Math.floor(parseInt(message.content.split(" ")[1]))
        if (target > 0 && target <= max && target != undefined && gameData["submissions"][target - 1][0] != undefined) {
            if (gameData["submissions"][target - 1][0] == id) {
                functions.replyMessage(message, "You can't vote for yourself!")
                return;
            }

            votedId = gameData["submissions"][target - 1][0]
            gameData["players"][id]["vote"] = votedId
            if(gameData["submissions"][target - 1][2] == undefined) gameData["submissions"][target - 1][2] = 0
            gameData["submissions"][target - 1][2] += 1;
            gameData["players"][votedId]["score"] += 1;
            functions.replyMessage(message, "You voted for **" + gameData["players"][votedId]["name"] + "**.")

            //are all votes in?
            for (var x in gameData["players"]) {
                if (gameData["players"][x]["vote"] == false) {
                    return;//nope, we return
                }
            }
            //all votes are in
            functions.sendMessage(bot.channels.get('668330311733739541'), "All votes have been cast. An admin will `$endround`")
        } else {
            functions.replyMessage(message, "Are you sure you sent a valid entry number?")
            return;
        }
    }
}