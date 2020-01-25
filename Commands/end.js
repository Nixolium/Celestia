module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return; }
    if (gameData["ingame"] != true) { return; }

    words = open('word_pool.txt','r').readlines()
    

    new functions.Paginator(message.channel, message.author, pages)
}