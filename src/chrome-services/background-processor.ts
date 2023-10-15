import { Message, MessageType } from "../models";

export {};


chrome.runtime.onMessage.addListener((message: Message<unknown>) => {
	console.log('[Background Process]', message)
})

chrome.tabs.onUpdated.addListener( async function (tabId, changeInfo, tab) {

	if(changeInfo.status === 'complete' && tab.active) {
		chrome.tabs.sendMessage<Message<null>>(tabId, { 
			type: MessageType.IssueScriptLoad, 
			data: null
		});
	}
})


