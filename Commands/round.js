module.exports = function (message) {

    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return; }


    if (gameData["ingame"] == true) {
        functions.replyMessage(message, "A round is currently ongoing.");
        return;
    }

    //make ingame


    //Add players from queue into game.
    for (let l = 0; l < gameData["queue"].length; l++) {
        let userid = gameData["queue"][l]
        gameData["players"][userid] = { "score": 0, "name": userData[userid].username, "vote": false, "id": userid, "submission": false }
        functions.sendMessage(bot.channels.get('668330311733739541'), "<@" + userid + "> has joined the game!")
    }
    //clears queue afterward
    gameData["queue"] = []


    //clear vote and submissions;
    for (const guy in gameData["players"]) {
        gameData["players"][guy].vote = false;
        gameData["players"][guy].submission = false;
    }
    gameData["submissions"] = [];

    //get and set prompt
    let randomNumber = Math.floor(Math.random() * wordData.length)
    let text = "<@&668338640564256799> The prompt is: **" + wordData[randomNumber] + "**"
    if (words.length > 1 && words[1].toUpperCase() == "-TWIST") {//twist
        randomNumber = Math.floor(Math.random() * wordData.length)
        text += " and **" + wordData[randomNumber] + "**"
    }
    functions.sendMessage(bot.channels.get('668330311733739541'), text);

    //players?
    if (Object.keys(gameData["players"]).length == 0) {
        functions.sendMessage(bot.channels.get('668330311733739541'), "Error. There are no players in the game.")
        return
    }
    gameData["ingame"] = true

    //timer
    bot.channels.get('668330311733739541').send('You have 5 Minutes!')

    let min = 5;
    let sec = 1;
    let end = false

    /*
    const timeinterval = setInterval(function () {
        sec -= 1
        if (sec < 0) {
            sec = 59
            min -= 1
        }
        if (min < 0) {
            bot.channels.get('668330311733739541').send("<@&668338640564256799> Time's Up! You have 60 seconds to `$submit` in a DM to <@670398513888100371>.")
            clearInterval(timeinterval);
            end = true;
        } else if (min == 2 && sec == 0) {
            bot.channels.get('668330311733739541').send("Two Minutes Remaining.")
        } else if (min == 1 && sec == 0) {
            bot.channels.get('668330311733739541').send("One Minute Remaining.")
        } else if (min == 0 && sec == 20) {
            bot.channels.get('668330311733739541').send("15 Seconds Remaining. Get your submission ready!")
        } else {
        }
    }, 1000)*/

    end = true
    sec2 = 20;
    const timeinterval2 = setInterval(function () {
        //console.log("going")
        if (end) {
            sec2 -= 1
            if (sec2 < 0) {
                bot.channels.get('668330311733739541').send("<@&668338640564256799> All the submissions are in! `$vote [x]` in a DM to <@670398513888100371> for your favorite entry.")
                //gameData["ingame"] == false
                //move submissions and post em...
                for (var guy in gameData["players"]) {
                    if (gameData["players"][guy].submission != false) {
                        gameData["submissions"].push([gameData["players"][guy]["id"], gameData["players"][guy].submission, 0])//pushes id, submission, and 0
                    }
                }

                //randomize order of submissions
                gameData["submissions"] = shuffle(gameData["submissions"]);
                
                let counter = 1
                for (var sub in gameData["submissions"]) {
                    let post = gameData["submissions"][counter-1][1]
                    bot.channels.get('668330311733739541').send("Submission " + counter +"\n" + post)
                    counter++
                }

                clearInterval(timeinterval2);

            } else if (sec2 == 15) {
                bot.channels.get('668330311733739541').send("<@&668338640564256799> 10 Seconds Remaining to submit. Failure to do so will disqualify you!")
            } else {
            }
        }
    }, 1000)
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}