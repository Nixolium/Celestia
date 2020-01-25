module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) return;
    let globalUsers = 0
    //text = ""
    let scores = []
    for (var x in gameData["players"]) {
        scores.push(x.score + " " + x.name)
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
        let user = xparrtosort[i].split(" ")
        let text = parseInt(user[0])
        let username = user[1]
        page.embed.fields[1].value += "**" + (i + 1) + ". " + username + "** with **$" + text + "**"
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
            page.embed.fields[1].value += "\n"
        }
    }
    /*if (page.embed.fields[1].value != "") {
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
    }*/
    new functions.Paginator(message.channel, message.author, pages)
}