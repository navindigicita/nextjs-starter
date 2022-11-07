import { createContext } from "react";

export const baseUrl = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_AZURE
    // process.browser === "prod.thinkly.me" ? process.env.NEXT_PUBLIC_BASE_URL_AZURE : process.env.NEXT_PUBLIC_BASE_URL_AZURE
);

export const baseUrlThinkly = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_THINKLY
    // process.browser === "prod.thinkly.me" ? process.env.NEXT_PUBLIC_BASE_URL_THINKLY : process.env.NEXT_PUBLIC_BASE_URL_THINKLY
);

export const baseUrlThinklyApi2 = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_THINKLY_API_TWO
    // document.domain === "prod.thinkly.me" ? process.env.NEXT_PUBLIC_BASE_URL_THINKLY_API_TWO : process.env.NEXT_PUBLIC_BASE_URL_THINKLY_API_TWO
); 

export const baseUrlTest = createContext(
    process.env.NEXT_PUBLIC_BASE_URL_TEST
    // document.domain === "prod.thinkly.me" ? process.env.NEXT_PUBLIC_BASE_URL_TEST : process.env.NEXT_PUBLIC_BASE_URL_TEST
);
