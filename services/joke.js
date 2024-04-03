import { api } from "../api/api";
import { UserDataManager } from "./userDataManager";

export const create = async (joke) => {
    try {
        return await api("POST", "/joke",
            {
                textBody: joke,
            },
            await UserDataManager.getToken()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteJoke = async (id) => {
    try {
        return await api("DELETE", `/joke/${id}`, undefined, await UserDataManager.getToken());
    } catch (error) {
        console.error(error);
        throw error;
    }
}