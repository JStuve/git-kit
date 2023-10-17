export enum MessageType {
    SetGithubDetails = 'set-github-details',
    Standard = 'standard',
    IssueScriptLoad = 'issue-script-load',
    IssueHide = 'issue-hide',
    GetIssues = 'get-issues'
}

export interface Message<T> {
    type: MessageType,
    data: T
};