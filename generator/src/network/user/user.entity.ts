export interface IUserEntity {
    email : string;
    name : string;
    pictureUrl : string;
}

export interface IUserEntityDb extends IUserEntity {
    id : number;
}