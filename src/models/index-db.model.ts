import { DBSchema } from "idb";

export const DbName = 'GitEx';

export enum IndexDbType {
    IssueVisible = 'issue-visible'
}

export interface IndexDbDatabaseSchema extends DBSchema {
    [IndexDbType.IssueVisible]: {
        key: string;
        value: IndexDbIssueVisible;
    }
}

/**
 * @deprecated Moved to the issue visible event
 */
export interface IndexDbIssueVisible {
    id: string;
    isVisible: boolean;
    gitHub: {
        author: string;
        repo: string;
    },
    hiddenDate: Date
}