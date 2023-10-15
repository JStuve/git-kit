import { Message, MessageType } from '../models';
import './issue-visible.scss';

chrome.runtime.onMessage.addListener((message: Message<unknown>) => {
	console.log('[Issue Visible]', message)
	if(message.type === MessageType.IssueScriptLoad) {
		loadIssueUI();
	}
});

function loadIssueUI(): void {
	var rawNodeElements = document.querySelectorAll('[id^="issue_"]');
	var issueElements: HTMLDivElement[] = Array.from(rawNodeElements).filter(function(element) {
		return element instanceof HTMLDivElement;
	}) as HTMLDivElement[];

	for(const issueElement of issueElements) {
		const issueId: string = issueElement.id.split('_')[1];
		issueElement.firstElementChild?.appendChild(getVisibleElement(issueId));
	}
}

function getVisibleElement(issueId: string): HTMLDivElement {
	const visibleDiv: HTMLDivElement = document.createElement('div');
	visibleDiv.dataset.issueId = issueId
	visibleDiv.className = 'visible-container';
	visibleDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>'

	visibleDiv.addEventListener('click', (ev: MouseEvent) => {
		const divElement: HTMLDivElement = ev.currentTarget as HTMLDivElement;
		const issueId: string = divElement.dataset.issueId ?? '0';

		const issueElement = document.getElementById(`issue_${issueId}`);
		if(issueElement) {
			issueElement.style.display = 'none';
			chrome.runtime.sendMessage<Message<string>>({ 
				type: MessageType.IssueClicked, 
				data: issueId
			});
		}
	})

	return visibleDiv;
}

export {};
