export interface IssueVisible {
    id: string;
    isVisible: boolean;
    gitHub: {
        author: string;
        repo: string;
    },
    hiddenDate: Date;
}