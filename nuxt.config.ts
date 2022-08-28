import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {  //client and server access
        APIKEY: process.env.APIKEY, //Would be better as private but would need to run own server
    },
    privateRuntimeConfig: { //server access only
        HELLO: "world in the server not the client",
    },
    css: ["~/assets/css/tailwind.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
});