
import signin from './signin.js';
class LoadViewSignin {
        constructor() {
                this.signin = new signin();
                this.signin.init();
        }
}

new LoadViewSignin();