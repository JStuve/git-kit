export enum MessageType {
    SetGithubDetails = 'set-github-details',
    Standard = '[Generic] Standard',
    IssueScriptLoad = '[Issue] Load script',
    IssueHide = '[Issue] Hide',
    IssueGet = '[Issue] Get'
}

export interface Message<T> {
    type: MessageType,
    data: T
};