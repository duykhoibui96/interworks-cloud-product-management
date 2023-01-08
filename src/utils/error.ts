export class CustomError extends Error {
    status = null;
    constructor(message: string, status: any) {
        super(message);
        this.status = status
    }
}