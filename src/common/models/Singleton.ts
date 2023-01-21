export abstract class Singleton {
    protected static instance: any;

    public static getInstance<T>(): T {
        throw new Error('No implementado');
    }
}