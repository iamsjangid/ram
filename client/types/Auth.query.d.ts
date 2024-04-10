export interface registerUserObj{
    name:string,
    email:string,
    password:string
}

export interface responseRegisterUser{
    msg:string,
    token:string,
    reqTime:string
}

export type loginUser = Omit<registerUserObj,'name'>;