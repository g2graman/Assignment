import User from './user.model';

class UserController {
    user: User;
    password: string;
    email: string;

    login() {
        this.user = new User(this.password, this.email);
    };
}

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
