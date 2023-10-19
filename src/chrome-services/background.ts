import { Message, MessageType } from "../models";

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	if(changeInfo.status === 'complete') {
		chrome.tabs.sendMessage<Message<null>>(tabId, { type: MessageType.IssueLoadUI, data: null })
	}
})

export {};
