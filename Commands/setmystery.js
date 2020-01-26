module.exports = function (message) {
    let id = message.author.id;
    if (devs.indexOf(id) == -1) { return; }
    words = message.content.split(" ")
    text = ""
    
    for(let x = 1; x<words.length; x++){
        text += words[x] + " ";
    }
    devData["mystery"] = text
    functions.replyMessage(message, "The Mystery Prompt has been set to: " + text)
}