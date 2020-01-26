module.exports = function (message) {
    let randomNumber = Math.floor(Math.random() * wordData.length)
    let words = message.content.split(" ")
    let text = ""
    if (words.length == 1) {
        functions.replyMessage(message, "Got Ya: **" + wordData[randomNumber] + "**")
        return;
    } else {
        //word = words[1]
        target = Math.floor(parseInt(message.content.split(" ")[1]))
        console.log(target)
        if (target > 0 && target <= 1000) {
            for (let x = 0; x < target; x++) {
                let randomNumber = Math.floor(Math.random() * wordData.length)
                text += (x + 1) + " **" + wordData[randomNumber] + "**\n"
            }
        }
        functions.replyMessage(message, "" + text + "")
    }
}