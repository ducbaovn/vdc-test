# Activity Service
Subcribe to activity topic for user activity information
### Collections
Define MongoDB Collections
### Workers
Define worker job which is triggered when received message from topic
### Database
We use MongoDB for Activity Service. To prevent init many connections to database, we implement Database Singleton
```
export declare class Database extends MongoDbConnection {
    private static instance;
    private constructor();
    static getInstance(): Promise<Database>;
    getCollection(name: string): Collection;
}
```
