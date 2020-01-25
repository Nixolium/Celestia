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
    if (gameData["players"][id] == undefined) {
        functions.replyMessage(message, "You are not in the game. Use `$join` to join it.")
        return;
    }
    var Attachment = (message.attachments).array();
    text = ""
    Attachment.forEach(function (attachment) {
        text += attachment.url + " "
    })
    if (text == ""){
        functions.replyMessage(message, "There does not appear to be an image.")
        return
    }
    if (gameData["players"][id].submission == false) {
        gameData["players"][id].submission = text
        functions.replyMessage(message, "Submission Received.")
    } else {
        gameData["players"][id].submission = text
        functions.replyMessage(message, "Submission Received. It replaced your previous submission.")
    }
}