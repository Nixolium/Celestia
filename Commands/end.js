module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return; }
    gameData["ingame"] = false;



    //publishes round winners
    let rwtext = ""
    let rcount = 1
    for (let x = 0; x < gameData["rounds"].length; x++) {
        rwtext += "Round " + rcount + " Winner(s):"
        for (let y = 0; y < gameData["rounds"].length; y++) {
            rwtext + gameData["rounds"][x][y]
        }
        rcount += 1
    }

    //publishes scoreboard
    let globalUsers = 0
    //text = ""
    let scores = []
    for (var x in gameData["players"]) {
        scores.push(gameData["players"][x].score + " " + gameData["players"][x].name)
        globalUsers += 1
    }
    scores.sort(function (a, b) { return parseInt(b.split(" ")[0]) - parseInt(a.split(" ")[0]) })
    let numPerPage = 10
    let page = {
        "embed": { //displays guild stats
            "color": 0xF1C40F,
            "fields": [{
                "name": "Scores",
                "value": ""
            }],
            "footer": {
                "text": ""
            },
        }
    }
    let pages = []
    for (var i = 0; i < globalUsers; i++) {
        let user = scores[i].split(" ")
        let text = parseInt(user[0])
        let username = user[1]
        page.embed.fields[0].value += "**" + (i + 1) + ". " + username + "** with **" + text + "** points"
        if (i % numPerPage == numPerPage - 1) { // separate pages
            page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + globalUsers //add footer to display where you are
            pages.push(page)
            page = {
                "embed": { //displays guild stats
                    "color": 0xF1C40F,
                    "fields": [{
                        "name": "Scores",
                        "value": ""
                    }],
                    "footer": {
                        "text": ""
                    },
                }
            }
        } else {
            page.embed.fields[0].value += "\n"
        }
    }
    if (page.embed.fields[0].value != "") {
        page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + globalUsers
        pages.push(page)
        page = {
            "embed": { //displays guild stats
                "color": 0xF1C40F,
                "fields": [{
                    "name": "Scores",
                    "value": ""
                }],
                "footer": {
                    "text": ""
                },
            }
        }
    }
    new functions.Paginator(message.channel, message.author, pages)

    //clears game
    gameData = { "queue": [], "players": {}, "rounds": [], "submissions": [], "arena": "668330311733739541", "ingame": false }
}