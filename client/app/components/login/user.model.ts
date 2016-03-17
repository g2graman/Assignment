interface IUserModel {
    password: string;
    email: string;
}

class Model implements IUserModel {
    password: string;
    email: string;

    constructor (
        password: string,
        email: string
    ) {
        this.password = password;
        this.email = email;
    }
}

export default Model;
