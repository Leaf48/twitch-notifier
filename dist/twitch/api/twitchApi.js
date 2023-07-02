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
const puppeteer_1 = __importDefault(require("puppeteer"));
const twitchApi = {
    getStreams: (streamer) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Create browser
            const browser = yield puppeteer_1.default.launch({
                headless: "new",
                args: ["--no-sandbox"],
            });
            // Go to the past streams page
            const page = yield browser.newPage();
            yield page.goto(`https://www.twitch.tv/${streamer}/videos?filter=archives&sort=time`);
            // Get all titles
            const elements = yield page.$$("article > div:first-child a");
            // Array for return
            let streams = [];
            for (const elem of elements) {
                const _title = yield elem.$("h3");
                const title = yield (_title === null || _title === void 0 ? void 0 : _title.evaluate((e) => e.textContent));
                // If not undefined
                if (title) {
                    const url = yield (elem === null || elem === void 0 ? void 0 : elem.evaluate((e) => e.getAttribute("href")));
                    if (title) {
                        streams.push({
                            title: title,
                            url: `https://www.twitch.tv${url}`,
                        });
                    }
                }
            }
            yield browser.close();
            return streams;
        }
        catch (error) {
            throw error;
        }
    }),
};
exports.default = twitchApi;
