import { createContext } from "react";
import type { Context } from "../types";

export const AppContext = createContext({
    user: null,
} as Context);
