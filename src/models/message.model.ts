export enum MessageType {
    Standard = 'standard',
    IssueScriptLoad = 'issue-script-load',
    IssueHide = 'issue-hide'
}

export interface Message<T> {
    type: MessageType,
    data: T
};