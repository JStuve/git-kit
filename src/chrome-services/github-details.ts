import { LocalStorageToken, Message, MessageType } from "../models";

chrome.runtime.onMessage.addListener(async (message: Message<unknown>) => {
	if(message.type === MessageType.SetGithubDetails) {
		await setGithubRepo(document.location.pathname);
	}
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

export {};
