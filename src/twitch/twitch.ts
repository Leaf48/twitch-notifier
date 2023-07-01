import { EventEmitter } from "events";
import twitchApi from "./api/twitchApi";
import { IVideo } from "../types/Video";

class TwitchBot {
	private name: string;
	streams: Array<IVideo>;
	private notifEmitter: EventEmitter;

	constructor(name: string, emitter: EventEmitter) {
		this.name = name;
		this.notifEmitter = emitter;
		this.streams = [];

		this.getStreams();
	}

	async getStreams(): Promise<Array<IVideo>> {
		try {
			const newStreams = await twitchApi.getStreams(this.name);

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
		} catch (error) {
			console.log(error);
			this.streams = [];
			return [];
		}
	}
}

export default TwitchBot;
