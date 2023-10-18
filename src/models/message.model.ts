export enum MessageType {
    SetGithubDetails = 'set-github-details',
    GithubDetailsGet = '[Github Details] Get',
    Standard = '[Generic] Standard',
    SetIcon = '[Generic] Set icon',
    IssueScriptLoad = '[Issue] Load script',
    IssueGet = '[Issue] Get',
    IssueShow = '[Issue] Show',
}

export interface Message<T> {
    type: MessageType,
    data: T
};