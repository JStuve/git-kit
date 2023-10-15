import { openDB, IDBPDatabase } from 'idb';
import { DbName, IndexDbDatabaseSchema, IndexDbType } from '../models';

export class IndexDB {

    private storeType: IndexDbType | undefined;

    db: IDBPDatabase<IndexDbDatabaseSchema> | undefined;

    constructor(type: IndexDbType) {
        this.storeType = type;
        
        this.openDb().then();
    }

    private async openDb() {
        this.db = await openDB<IndexDbDatabaseSchema>(DbName, 1, {
            upgrade(db) {
                db.createObjectStore(IndexDbType.IssueVisible);
            }
        });
    }

    async getAll<T>(): Promise<T[]> {
        return await this.db?.getAll(this.storeType as IndexDbType) as T[];
    }

    async get<T>(id: string): Promise<T> {
        return await this.db?.get(this.storeType as IndexDbType, id) as T;
    }

    async update<T>(id: string, value: T): Promise<T> {
        return await this.db?.put(this.storeType as IndexDbType, value as any, id) as T;
    }
}