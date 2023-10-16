export enum MessageType {
    SetGithubDetails = 'set-github-details',
    Standard = 'standard',
    IssueScriptLoad = 'issue-script-load',
    IssueHide = 'issue-hide'
}

export interface Message<T> {
    type: MessageType,
    data: T
};