module.exports = function (message) {
    let randomNumber = Math.floor(Math.random() * wordData.length)
    functions.replyMessage(message, "Got Ya: **" + wordData[randomNumber] + "**")
}