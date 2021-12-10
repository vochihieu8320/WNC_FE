export class User {
    id: number;
    name: string;
    email: string;
    type: string;
    iat : number;
    exp : number;
    token?: string;
    constructor(id: number, name: string, email: string, type: string, exp? : number, iat?:number, token?: string)
    { 
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type;
        this.iat = iat || 0;
        this.exp = exp || 0;
    }
  }