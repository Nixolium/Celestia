module.exports=function(message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) return;
    gameData = {"queue": [], "players": {}, "rounds": [], "submissions": [], "arena": message.channel.id, "ingame": false}
    functions.replyMessage(message, "Setup complete.")
}