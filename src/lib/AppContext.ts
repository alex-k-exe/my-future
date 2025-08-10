import { createContext } from "react";
import type { Context } from "../types";

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
    }
} as Context);
