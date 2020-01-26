module.exports = function (message) {
    let id = message.author.id;
    if (devs.indexOf(id) == -1) { return; }
    words = message.content.split(" ")
    if (words.length == 1) {
        return;
    }
    word = words[1]
    if (wordData.indexOf(word) != -1) {
        functions.replyMessage(message, "The word " + word + " is already in the list")
    } else {
        wordData.push(word)
        functions.replyMessage(message, word + " has been added to the list of " + wordData.length + " words.")
    }
}