import { createContext } from "react";

export const baseUrl = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_AZURE
);

export const baseUrlThinkly = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_THINKLY
);

export const baseUrlThinklyApi2 = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_THINKLY_API_TWO
); 

export const baseUrlTest = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_TEST
);
