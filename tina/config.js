import { UsernamePasswordAuthJSProvider as UsernamePasswordAuthJSProvider, TinaUserCollection as TinaUserCollection } from "tinacms-authjs/dist/tinacms";
import { defineConfig as defineConfig, LocalAuthProvider as LocalAuthProvider } from "tinacms";
import page from "./collections/page";
import post from "./collections/post";
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
export const config = defineConfig({
    contentApiUrlOverride: "/api/tina/gql",
    authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch: process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
        process.env.HEAD, // Netlify branch env
    token: process.env.TINA_TOKEN,
    media: {
        // If you wanted cloudinary do this
        // loadCustomStore: async () => {
        //   const pack = await import("next-tinacms-cloudinary");
        //   return pack.TinaCloudCloudinaryMediaStore;
        // },
        // this is the config for the tina cloud media store
        tina: {
            publicFolder: "public",
            mediaRoot: "uploads",
        },
    },
    build: {
        publicFolder: "public", // The public asset folder for your framework
        outputFolder: "admin", // within the public folder
    },
    schema: {
        collections: [
            TinaUserCollection,
            page,
            post
        ]
    }
});
export default config;
