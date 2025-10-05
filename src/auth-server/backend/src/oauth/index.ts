// Public functions
export * from "./linkState";
export * from "./session";
export * from "./validate";

// More readable format
import * as link from "./linkState";
import * as session from "./session";
import * as validate from "./validate";

export const OAuth = {
    ...validate,
    session: {
        start: session.startSession,
        get: session.getSession,
        link: link.linkState,
    },
    require: link.linkState,
};
export default OAuth;