import { Message, MessageType } from "../models";

export {};

chrome.browserAction?.onClicked?.addListener(async function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	await chrome.tabs.executeScript(tab.id ?? 0, {
		file: 'issueVisible.js'
	});

	chrome.runtime.sendMessage<Message<string>>({ type: MessageType.Standard, data: 'From background process'});

});


chrome.contextMenus.onClicked.addListener((value, tab) => {
	console.log(value);
});

chrome.runtime.onInstalled.addListener(function (val) {
	console.log(val);

	chrome.contextMenus.create({
		title: "GitEx Toolkit",
		contexts: ["all"],
		id: 'parent'
	}, () => {
		// Create a parent item and two children.
		chrome.contextMenus.create({
			title: 'Hide Issue',
			id: 'hide-issue-c',
			parentId: 'parent'
		});
	})
});