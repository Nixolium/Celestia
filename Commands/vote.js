module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (gameData["ingame"] != true) {
        return;
    }
    if (gameData["queue"].indexOf(id) != -1) {
        functions.replyMessage(message, "You are in the queue. Please wait for the next round to start.")
        return;
    }
    if (gameData["players"].indexOf(id) = -1) {
        functions.replyMessage(message, "You are not in the game. Use `$join` to join it.")
        return;
    }
    if (words.length != 2) {
        functions.replyMessage(message, "Use the following syntax: `$vote [vote#]`")
        return;
    } else {
        
    }
}