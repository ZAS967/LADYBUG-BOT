/*

 ▀▀█▀▀ █░▄▀ █▀▄▀█   █▀▀█ █▀▀▀█ ▀▀█▀▀
 ░▒█░░ █▀▄░ █▒█▒█   █▀▀▄ █░░▒█ ░▒█░░
 ░▒█░░ █░▒█ █░░▒█   █▄▄█ █▄▄▄█ ░▒█░░

© TKM-mods
WhatsApp Me : 263775571820

 - Source ↓
 - t.me/TKM-mods
 - wa.me/263775571820
 - https://whatsapp.com/channel/0029Vb5lvXDCMY0EyIW8Yf19

*/

require("./all/module.js")

//========== Setting Owner ==========//
global.owner = "263777124998"
global.namaowner = "Mr Ntando"
global.namaowner2 = "Ntando-mods"

//======== Setting Bot & Link ========//
global.namabot = "LADYBUG MD" 
global.namabot2 = "LADYBUG MD"
global.version = "v3"
global.foother = "Created By Mr Ntando"
global.linkgc = 'https://youtube.com/@Ntando-mods'
global.linksaluran = "https://youtube.com/@Ntando-mods"
global.linkyt = 'https://youtube.com/@Ntando-mods'
global.linktele = "https://t.me/ntando_mods"
global.packname = "Created By Ntando-mods"
global.author = "Mr Ntando Ofc"

//========== Setting Event ==========//
global.welcome = true
global.autoread = true
global.anticall = true
global.autoreadsw = true
global.owneroff = false
global.antibug = true


//========= Setting Message =========//
global.msg = {
    "error": "An error has occurred",
    "done": "Done, Boss ✅", 
    "wait": "The bot is processing, please wait a moment . . .", 
    "group": "*• Group Only* This feature is only for groups!", 
    "private": "*• Private Chat* This feature is only for private chats!", 
    "admin": "*• Admin Only* This feature is only for group admins!", 
    "adminbot": "*• Bot Admin* This feature can be used when the bot is an admin", 
    "owner": "*• Owner Only* This feature is only for the bot owner!", 
    "developer": "*• Developer Only* This feature is only for developers"
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
