// Public functions
import * as register from "./register";
import * as login from "./login";
export { register, login  };

// More readable format
export const WebAuthn = {
    register: register.default,
    login: login.default
};

export default WebAuthn;