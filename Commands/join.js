module.exports=function(message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    for (var x in gameData["players"]) {
        if(id = gameData["players"][x]){
            functions.replyMessage(message, "You are already in the game!")
            return;
        }
    }
    for (var x in gameData["queue"]) {
        if(id = x){
            functions.replyMessage(message, "You are in the queue. Please wait for the next round to start.")
            return;
        }
    }
    gameData["queue"].push(id)
    functions.replyMessage(message, "You have joined the queue. Please wait for the next round to start")
    functions.sendMessage(bot.channels.get('668330311733739541'), "<@" + message.author.id + "> has joined the queue!")
}