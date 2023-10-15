export enum MessageType {
    Standard = 'standard',
    IssueScriptLoad = 'issue-script-load',
    IssueClicked = 'issue-clicked'
}

export interface Message<T> {
    type: MessageType,
    data: T
};