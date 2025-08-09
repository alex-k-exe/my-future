import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Parses a date in format "YYYY-MM-DD" and returns how many days it has been since that date */
export function daysSince(dateString: string) {
    const givenDate = new Date(dateString);
    const today = new Date();

    // Difference in milliseconds
    const diffInMs = today.getTime() - givenDate.getTime();

    // Convert to days
    const msInDay = 1000 * 60 * 60 * 24;
    return Math.round(diffInMs / msInDay);
}
