import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function loadImageFromUrl(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`An error occurred fetching "${url}" (${response.status})`);

    const blobData = await response.blob();
    return new File([blobData], filename, { type: response.headers.get('Content-Type') ?? undefined })
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
