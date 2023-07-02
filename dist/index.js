"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const events_1 = require("events");
const twitch_1 = __importDefault(require("./twitch/twitch"));
require("dotenv").config();
// Telegram Bot
const token = process.env.token || "";
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
// Notifier
const notificationEmitter = new events_1.EventEmitter();
// Twitch
const twitch = new twitch_1.default(process.env.streamer || "", notificationEmitter);
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    twitch.getStreams();
}), 1000 * 60);
notificationEmitter.on("update", (streams) => {
    if (streams.length > 0) {
        const msg = `🎮${streams[0].title}\n🔗URL: ${streams[0].url}`;
        bot.sendMessage(process.env.chatId || "", msg);
        console.log("実行しました");
    }
});
