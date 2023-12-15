import { type Message, MessageType } from "../models";

if(chrome?.tabs?.onUpdated) {
	chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
		if(changeInfo.status === 'complete') {
			chrome.tabs.sendMessage<Message<null>>(tabId, { type: MessageType.IssueLoadUI, data: null })

			const tab: chrome.tabs.Tab[] = await chrome.tabs.query({active: true, currentWindow: true});
			chrome.tabs.sendMessage<Message<string | undefined>>(tabId, { type: MessageType.IssueVisitedCheck, data: tab[0]?.url})
		}
	})
}
