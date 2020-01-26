module.exports=function(message) {
    let id = message.author.id;
    functions.replyMessage(message, 
    "\`\`\`" +
    "-----Main Commands-----\n" +
    "help - Get this help box.\n" +
    "ping - pong!\n"+
    "suggest - send an admin your suggestions\n"+
    "wordme - get a random word\n\n"+
    
    "-----Game Commands-----\n" +
    "join - Join the game during the next round.\n" +
    "score - See how many points you have.\n" +
    "submit - Send your submission. We'd prefer DMs.\n" +
    "vote - Vote for your favorite among the submissiosn. We'd prefer DMs.\n\n" +

    "-----Dev Commands-----\n" +
    "setup - Set up intricacies of the bot.\n" +
    "round - Start a new round. Mods: `-twist`; `-mystery`\n" +
    "endround - After voting, compile scores.\n" +
    "scoreboard - See a running scoreboard.\n" +
    "end - End the game. A game summary with be given.\n" +
    "setmystery - Set the next mystery prompt.\n" +
    "shutdown - Shut everything down.\n\n" +

    "\`\`\`")
}