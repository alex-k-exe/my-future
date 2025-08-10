import {createContext} from "react";
import type {Context} from "../types";

export const AppContext = createContext({
    user: null,
    fetchApi: async (endpoint: `/${string}`): Promise<Response> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }

        return fetch(`https://my-future-backend.onrender.com${endpoint}`, {
            headers: {
                Cookie: `token=${token}`
            }
        });
    },
    fetchApiPublic: async (endpoint: `/${string}`): Promise<Response> => {
        return fetch(`https://my-future-backend.onrender.com${endpoint}`);
    },
    updateUser: async (context: Context): Promise<void> => {
        const user = await context.fetchApi("/users/@me");
        context.user = await user.json().then(data => data.user);
    }
} as Context);
