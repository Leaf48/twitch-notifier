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
const twitchApi_1 = __importDefault(require("./api/twitchApi"));
class TwitchBot {
    constructor(name, emitter) {
        this.name = name;
        this.notifEmitter = emitter;
        this.streams = [];
        this.getStreams();
    }
    getStreams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newStreams = yield twitchApi_1.default.getStreams(this.name);
                // At the beginning or when resetted
                if (this.streams.length === 0) {
                    this.streams = newStreams;
                    this.notifEmitter.emit("update", newStreams);
                    return this.streams;
                }
                // Notify
                if (newStreams[0].url !== this.streams[0].url) {
                    this.streams = newStreams;
                    this.notifEmitter.emit("update", newStreams);
                }
                return this.streams;
            }
            catch (error) {
                console.log(error);
                this.streams = [];
                return [];
            }
        });
    }
}
exports.default = TwitchBot;
