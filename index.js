const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");


const msg = fs.readFileSync("message.txt", "utf-8");

const res = fs.readFileSync("number.txt", "utf-8");
const data = res.split(/\r?\n/);

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  for (let index = 0; index < data.length; index++) {
    const number = data[index];
    const media = MessageMedia.fromFilePath("data.pdf");
    // Your message.

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";
    
    // Sending message.
    client.sendMessage(chatId, msg);
    client.sendMessage(chatId,media);
    console.log(`Message sent to ${number}`);
  }
});

client.initialize();
