export class LoginAllow {
    id?: string;
    email!: string;
    password!:string;
    role!: string;
    isActive!: boolean;
    history?: { lastLogin: any, ip: string }[];
     
}
