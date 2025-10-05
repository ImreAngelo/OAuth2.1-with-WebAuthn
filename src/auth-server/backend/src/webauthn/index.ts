// Public functions
export * from "./login/options";
export * from "./register/options";

// More readable format
import * as loginOptions from "./login/options";
import * as registerOptions from "./register/options";

export const WebAuthn = {
    login: {
        getOptions: loginOptions.getLoginOptions,
    },
    register: {
        getOptions: registerOptions.getRegistrationOptions,
    },
};

export default WebAuthn;