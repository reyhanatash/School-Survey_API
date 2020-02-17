export class register {
    public username: string;
    public password: string;
    public type;
    public email:string;
    public mobile:string;
    public location;
}

export class login {
    public username: string;
    public password: string;
}
export class Manager{
    public id:number;
    public username:string;
    public password:string;
    public locationId:number;
    public type : number;
}
export class ChangePass{
    public id:number;
    public password:string;
    public newPassword:string;
    public reNewPassword:string;
}