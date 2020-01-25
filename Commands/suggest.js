module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)

    let text = "<@" + id + "> suggests: "
    for (let x = 1; x < words.length; x++){
        text+=words[x] + " "
    }
    bot.channels.get('670721392416784424').send(text)
    functions.replyMessage(message, "Your suggestion of `"+ text + "` has been received.")
}