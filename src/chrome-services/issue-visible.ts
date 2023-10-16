import { IndexDbIssueVisible, IndexDbType, LocalStorageToken, Message, MessageType } from '../models';
import './issue-visible.scss';
import { IndexDB } from "../services/index-db.service";

const issueIndexDb: IndexDB = new IndexDB(IndexDbType.IssueVisible);

chrome.runtime.onMessage.addListener(async (message: Message<unknown>) => {
	console.log('[Issue Visible]', message)
	if(message.type === MessageType.IssueScriptLoad) {
		await loadIssueUI();
	}
});

async function loadIssueUI(): Promise<void> {
	const githubAuthor: string | null = await localStorage.getItem(LocalStorageToken.GitAuthor);
	const githubRepo: string | null = await localStorage.getItem(LocalStorageToken.GitRepo);

	if(githubAuthor === null || githubRepo === null) {
		// TODO: Show some error message
		return;
	}

	const existingIssuesHidden: IndexDbIssueVisible[] = await issueIndexDb.getAll(); // TODO: Update to only get records by author and repo 
	const rawNodeElements = document.querySelectorAll('[id^="issue_"]');
	const issueElements: HTMLDivElement[] = Array.from(rawNodeElements).filter(function(element) {
		return element instanceof HTMLDivElement;
	}) as HTMLDivElement[];

	for(const issueElement of issueElements) {
		const issueId: string = issueElement.id.split('_')[1];
		const isVisible: boolean = existingIssuesHidden?.find(i => i.id === getKey(githubAuthor, githubRepo, issueId))?.isVisible === false ? false : true;

		const visibleContainerExists: boolean = !!issueElement.firstElementChild?.querySelector(`#${getVisibleElementId(issueId)}`);

		if(visibleContainerExists === false) {
			issueElement.firstElementChild?.appendChild(getVisibleElement(issueId));
			issueElement.style.display = isVisible ? 'block' : 'none';
		}
	}
}

function getVisibleElement(issueId: string): HTMLDivElement {
	const visibleDiv: HTMLDivElement = document.createElement('div');
	visibleDiv.dataset.issueId = issueId
	visibleDiv.className = 'visible-container';
	visibleDiv.id = getVisibleElementId(issueId);
	visibleDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>'

	visibleDiv.addEventListener('click', async (ev: MouseEvent) => {
		const divElement: HTMLDivElement = ev.currentTarget as HTMLDivElement;
		const issueId: string = divElement.dataset.issueId ?? '0';

		const issueElement = document.getElementById(`issue_${issueId}`);
		if(issueElement) {

			const githubAuthor: string | null = await localStorage.getItem(LocalStorageToken.GitAuthor);
			const githubRepo: string | null = await localStorage.getItem(LocalStorageToken.GitRepo);

			if(githubAuthor === null || githubRepo === null) {
				// TODO: Show some error message
				return;
			}

			issueElement.style.display = 'none';

			const dbKey: string = getKey(githubAuthor, githubRepo, issueId)

			chrome.runtime.sendMessage<Message<string>>({ 
				type: MessageType.IssueHide, 
				data: getKey(githubAuthor, githubRepo, issueId)
			});

			await issueIndexDb.update<IndexDbIssueVisible>(dbKey, { 
				id: dbKey, 
				isVisible: false,
				gitHub: {
					author: githubAuthor,
					repo: githubRepo
				},
				hiddenDate: new Date()
			});
		}
	})

	return visibleDiv;
}

function getKey(gitHubAuthor: string, githubRepo: string, issueId: string): string {
	return `${gitHubAuthor}-${githubRepo}-${issueId}`;
}

function getVisibleElementId(issueId: string): string {
	return `visible-container-${issueId}`;
}

export {};
