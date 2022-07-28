import { createContext } from "react";

export const baseUrl = createContext( 
    process.browser === "prod.thinkly.me" ? process.env.NEXT_PUBLIC_BASE_URL_AZURE : process.env.NEXT_PUBLIC_BASE_URL_AZURE
);

export const baseUrlThinkly = createContext(
    process.browser === "prod.thinkly.me" ? process.env.NEXT_PUBLIC_BASE_URL_THINKLY : process.env.NEXT_PUBLIC_BASE_URL_THINKLY
); 

