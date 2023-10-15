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

export interface IndexDbIssueVisible {
    id: string;
    isVisible: boolean;
}