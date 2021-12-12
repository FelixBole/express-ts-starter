export class HashError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = 'HashError';
    }
}
