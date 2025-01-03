import { axiosServer } from "./axios";

/**
 * Validates the session token.
 *
 * @param {string} sessionToken - The session token to be validated.
 * @returns {Promise<boolean>} - A promise that resolves when the session token is validated.
 */
export default async function sessionTokenValidation(username: string, sessionToken: string): Promise<boolean> {
    try {
        const { status } = await axiosServer.post("/validation-session", { username, sessionToken });
        return status === 200 ? true : false;
    } catch (err) {
      console.log("sessionTokenValidation Error", err)
        return false;
    }
}
