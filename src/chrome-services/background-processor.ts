import { Message, MessageType } from "../models";

chrome.runtime.onMessage.addListener((message: Message<unknown>) => {
	console.log('[Background Process]', message)
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

	if(changeInfo.status === 'complete' && tab.active) {
		chrome.tabs.sendMessage<Message<null>>(tabId, { 
			type: MessageType.IssueScriptLoad, 
			data: null
		});

		chrome.tabs.sendMessage<Message<null>>(tabId, { 
			type: MessageType.SetGithubDetails, 
			data: null
		});
	}
})

export {};
