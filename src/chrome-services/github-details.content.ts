import { GithubDetails, GithubTab, LocalStorageToken, Message, MessageType } from "../models";
import { ArrayUtility } from "../utilities";

if(chrome?.runtime?.onMessage) {
    chrome.runtime.onMessage.addListener(async (message: Message<unknown>, never, sendResponse) => {
        switch(message.type) {
            case MessageType.GithubDetailsGet: {
                sendResponse(getGithubDetails());
                break;
            }
            default: break;
        }
    });
}

function getGithubDetails(): GithubDetails {

    const splitUrl: string[] = document.location?.pathname?.split('/')

    const author: string = ArrayUtility.safeGetNth(splitUrl, 1) ?? '';
    const repo: string = ArrayUtility.safeGetNth(splitUrl, 2) ?? '';
    const tab: GithubTab = ArrayUtility.safeGetNth(splitUrl, 3) as GithubTab ?? GithubTab.Home;

    localStorage.setItem(LocalStorageToken.GitAuthor, author)
    localStorage.setItem(LocalStorageToken.GitRepo, repo)
    localStorage.setItem(LocalStorageToken.GitTab, tab)

    return {
        isGithubSite: document.location.hostname.includes('github'),
        author: author, 
        repo: repo,
        tab: tab,
    }
}

getGithubDetails();

export {};
