import puppeteer from "puppeteer";
import { IVideo } from "../../types/Video";

const twitchApi = {
	getStreams: async (streamer: string): Promise<Array<IVideo>> => {
		try {
			// Create browser
			const browser = await puppeteer.launch({
				headless: "new",
				args: ["--no-sandbox"],
			});
			// Go to the past streams page
			const page = await browser.newPage();
			await page.goto(
				`https://www.twitch.tv/${streamer}/videos?filter=archives&sort=time`
			);

			// Get all titles
			const elements = await page.$$("article > div:first-child a");

			// Array for return
			let streams: Array<IVideo> = [];
			for (const elem of elements) {
				const _title = await elem.$("h3");
				const title = await _title?.evaluate((e) => e.textContent);

				// If not undefined
				if (title) {
					const url = await elem?.evaluate((e) => e.getAttribute("href"));
					if (title) {
						streams.push({
							title: title,
							url: `https://www.twitch.tv${url}`,
						});
					}
				}
			}
			await browser.close();

			return streams;
		} catch (error) {
			throw error;
		}
	},
};

export default twitchApi;
