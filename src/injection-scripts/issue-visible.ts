import { Message } from '../models';
import './issue-visible.scss';


chrome.runtime.onMessage.addListener((message: Message<unknown>) => {
	console.log('[Issue Visible]', message)
})

function loadIssueUI(): void {
	var rawNodeElements = document.querySelectorAll('[id^="issue_"]');
	var issueElements: HTMLDivElement[] = Array.from(rawNodeElements).filter(function(element) {
		return element instanceof HTMLDivElement;
	}) as HTMLDivElement[];

	const visibleElement: HTMLDivElement = getVisibleElement();

	console.log('[Issue Visible]', 'Issues found', issueElements.length)

	for(const issueElement of issueElements) {
		
		const firstDiv = issueElement.querySelector('div:first-child');
		console.log(firstDiv?.parentElement?.id);
		
		if(firstDiv) {
			firstDiv.appendChild(visibleElement);
		} else {
			console.log('[Issue Visible]', 'First div miss')
		}
	}
}

function getVisibleElement(): HTMLDivElement {
	const visibleDiv: HTMLDivElement = document.createElement('div');
	visibleDiv.className = 'visible-container';

	visibleDiv.style.display = 'flex';
	visibleDiv.style.alignItems = 'center';
	visibleDiv.style.justifyContent = 'center';
	visibleDiv.style.height = '20px';
	visibleDiv.style.width = '20px';
	visibleDiv.style.margin = 'auto 0.25rem';
	visibleDiv.style.color = 'var(--color-scale-gray-3)';

	visibleDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>'

	return visibleDiv;
}

loadIssueUI();

export {};
