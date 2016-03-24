import User from './user.model';

class UserController {
    user: User;
    password: string;
    email: string;

    constructor (socket) {
        console.log(socket);
    }

    login() {
        this.user = new User(this.password, this.email);
    };
}
UserController.$inject = ['socket'];

export const controller = UserController;
export const template = require('./login.jade')();
const LoginComponent = {
    name: 'login',
    bindings: {},
    template,
    controller,
    restrict: 'E',
    controllerAs: 'ctrl'
};
export default LoginComponent;
