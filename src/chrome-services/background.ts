import { Message } from "../models";

chrome.runtime.onMessage.addListener(async (message: Message<unknown>) => {
	console.log('[Background Process]', message)
})

export {};
