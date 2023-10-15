export enum MessageType {
    Standard = 'standard',
    IssueHide = 'issue-hide'
}

export interface Message<T> {
    type: MessageType,
    data: T
};