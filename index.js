const dotenv = require("dotenv");
dotenv.config();
const TelegramBot = require("node-telegram-bot-api");

const OpenAi = require("./utils/openAi");
const User = require("./utils/addUsers");

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  try {
    let newUser = { username: msg.from.username, chatId: msg.chat.id };
    await User.updateUsers(newUser, bot);
    if (msg.text.startsWith("/start")) {
      bot.sendMessage(msg.chat.id, "Welcome! How can I help you?");
    } else if (msg.text.startsWith("/stop")) {
      bot.sendMessage(msg.chat.id, "Goodbye! Have a nice day.", {
        reply_to_message_id: msg.message_id,
      });
    } else {
      bot.sendChatAction(msg.chat.id, "typing");
      const sentMessage = await bot.sendMessage(msg.chat.id, "Please Wait...", {
        reply_to_message_id: msg.message_id,
      });
      const result = await OpenAi.grammerCorrection(msg);
      bot.editMessageText(result, {
        chat_id: msg.chat.id,
        message_id: sentMessage.message_id,
      });
    }
  } catch (error) {
    bot.sendMessage(msg.chat.id, "Sorry!!");
  }
});
