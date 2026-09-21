const loadJson = require("../../../loadJson")
const { commands } = require("../../core/commandHandler");
const categories = require("../../settings/categories");
const config = loadJson("./src/settings/config.json");
const fs = require("fs")
const path = require("path")

const botName = config.botName.value;
const prefix = config.prefix.value;
const dono = config.nomeDono.value;

module.exports = {
name: "menuadm",
category: "menus",
desc: "Ver os comandos de ADM",
usage: `${prefix}menuadm`,

async run({ sock, msg, jid, args, g }) {
const imagePath = path.resolve(__dirname, "../../assets/media/morvyn.png")
const morvyn = fs.readFileSync(imagePath)

let text = `☾･ﾟ:･ﾟ✦MORVYN BOT✦･ﾟ:･ﾟ☽
┃ 🤖 Bot: ${botName}
┃ 🎯 Versão: 0.1.1
┃ 👑 Adm: ${g.pushName}
┃ 🚀 Prefixo: ${prefix}
☾ ⋆･ﾟ:⋆･ﾟ✦━━━━━✦･ﾟ:⋆･ﾟ ⋆☽\n${g.readMore}`;

const listed = new Set()
const grouped = {};

for (const cmd of commands.values()) {
if (cmd.hidden) continue;
if (cmd.type !== "admin") continue

if (listed.has(cmd.name)) continue;
listed.add(cmd.name);

const cat = cmd.category || "outros";
if (!grouped[cat]) grouped[cat] = [];
grouped[cat].push(cmd);
}

const orderedCategories = Object.entries(categories).sort(
(a, b) => (a[1].order ?? 99) - (b[1].order ?? 99),
);

for (const [key, info] of orderedCategories) {
if (!grouped[key]) continue;

text += `\n${info.title}\n`;

grouped[key].forEach((cmd) => {
text += `┃ ➥ ${cmd.usage}\n`;
});

text += "☾ ⋆･ﾟ:⋆･ﾟ✦━━━━━✦･ﾟ:⋆･ﾟ ⋆☽\n";
}

await g.sendReaction(sock, jid, "🛡️")

await g.sendImage(jid, morvyn, text);
},
};