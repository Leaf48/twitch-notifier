import TelegramBot from "node-telegram-bot-api";
import { EventEmitter } from "events";
import TwitchBot from "./twitch/twitch";
import twitchApi from "./twitch/api/twitchApi";
import { IVideo } from "./types/Video";
require("dotenv").config();

// Telegram Bot
const token = process.env.token || "";
const bot = new TelegramBot(token, { polling: true });

// Notifier
const notificationEmitter = new EventEmitter();

// Twitch
const twitch = new TwitchBot(process.env.streamer || "", notificationEmitter);

setInterval(async () => {
	twitch.getStreams();
}, 1000 * 10);

notificationEmitter.on("update", (streams: Array<IVideo>) => {
	if (streams.length > 0) {
		const msg = `${streams[0].title}\n動画が更新されました。\nURL: ${streams[0].url}`;
		bot.sendMessage(process.env.chatId || "", msg);
		console.log("実行しました");
	}
});
