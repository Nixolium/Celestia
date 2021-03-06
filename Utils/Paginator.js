﻿var MessageAwait = require("./MessageAwait.js")
class Paginator {
    constructor(channel, dad, pages) {
        this.current = 0;
        this.total = pages.length;
        this.pages = pages;
        if (channel.type != "dm" && channel.type != "group" && (channel.memberPermissions(bot.user) != null && !channel.memberPermissions(bot.user).has("SEND_MESSAGES"))) { return }
        this.first = "⏮";
        this.back = "◀"
        this.stop = "⏹";
        this.next = "▶";
        this.last = "⏭";
        this.number = "🔢";
        this.pause = false
        //if (channel.memberPermissions(bot.id) != null && !channel.memberPermissions(bot.id).has("SEND_MESSAGES")) { return }
        channel.send(pages[0]).then(async (msg) => {
            /**
			 * Message sent
			 * @type {Message}
			 */
            this.message = msg;
            if (channel.type == "dm" || channel.type == "group" || channel.memberPermissions(bot.user) != null || channel.memberPermissions(bot.user).has("ADD_REACTIONS")) {
                await this.message.react(this.first).catch(function (err) { console.error(err) });
                await this.message.react(this.back).catch(function (err) { console.error(err) });
                await this.message.react(this.stop).catch(function (err) { console.error(err) });
                await this.message.react(this.next).catch(function (err) { console.error(err) });
                await this.message.react(this.last).catch(function (err) { console.error(err) });
                await this.message.react(this.number).catch(function (err) { console.error(err) });
            }
            this.collector = this.message.createReactionCollector((reaction, user) => reaction.me && user.id === dad.original && user.id !== this.message.author.id, { time: 100000 });
            this.collector.on("collect", (reaction, collector) => {
                if (!this.pause) {
                    if (this.message.channel.type == "dm" || this.message.channel.type || "group" || (this.message.channel.memberPermissions(bot.user) == null || this.message.channel.memberPermissions(bot.user).has("MANAGE_MESSAGES"))) { reaction.remove(dad) };
                    switch (reaction.emoji.toString()) {
                        case this.first:
                            this.current = 0;
                            break;
                        case this.last:
                            this.current = this.total - 1;
                            break;
                        case this.stop:
                            this.collector.stop();
                            this.message.clearReactions();
                            break;
                        case this.back:
                            this.current--;
                            if (this.current < 0) this.current = this.total - 1;
                            break;
                        case this.next:
                            this.current++;
                            if (this.current > this.total - 1) this.current = 0;
                            break;
                        case this.number:
                            this.pause = true;
                            new MessageAwait(this.message.channel, dad.id, "Please enter a number between 1 and " + pages.length + ".",
                                function (response) {
                                    let number = parseInt(response.content);
                                    if (!isNaN(number) && number >= 1 && number <= pages.length) {
                                        return true
                                    } else {
                                        return false
                                    }
                                },
                                function (response, currPaginator) {
                                    currPaginator.current = parseInt(response.content) - 1;
                                    currPaginator.pause = false;
                                    currPaginator.refresh()
                                },
                                this)
                    }
                    this.refresh();
                }
            })
        }).catch(function (err) { console.error(err) });
    }
    refresh() {
        this.message.edit(this.pages[this.current]).catch(function (err) { console.error(err) });
    }
}

module.exports = Paginator