import { LocalStorageToken, Message, MessageType } from "../models";

chrome.runtime.onMessage.addListener(async (message: Message<unknown>) => {
	console.log('[Github Details]', message)
});

function setGithubRepo(url: string | undefined): void {
    if(url === undefined) {
        return;
    }

    const splitUrl: string[] = url?.split('/')

    if(splitUrl?.length > 2) {
        localStorage.setItem(LocalStorageToken.GitAuthor, splitUrl[1])
        localStorage.setItem(LocalStorageToken.GitRepo, splitUrl[2])
    }
}

setGithubRepo(document.location.pathname);

export {};
