import UserType from "./UserType";

// TODO: In production, consider using a cache for a distributed system
const sessions = new Map<string, UserType>();

export default sessions;