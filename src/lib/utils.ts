import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Parses a Date string and outputs it in 10 Jan 2022 for example */
export function formatDate(s: string) {
    const date = new Date(s);
    return date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}
