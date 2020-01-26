module.exports = function (message) {
    let id = message.author.id;
    if (devs.indexOf(id) == -1) { return; }
    let randomNumber = Math.floor(Math.random() * wordData.length)
    words = message.content.split(" ")
    if (words.length == 1) {
        return;
    }
    word = words[1]
    if (wordData.indexOf(word) != -1) {
        wordData.splice(wordData.indexOf(word), 1);
        functions.replyMessage(message, word + " removed")
    } else {
        functions.replyMessage(message, "We could not find the word " + word)
    }
}