declare namespace Express {
    export interface Request {
        user?: {
            email : string;
            name : string;
            id: number;
            iat : number;
            exp : number;
        };
    }
}