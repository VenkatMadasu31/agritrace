import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // proxy /digilocker/* to your Mock Digilocker server
        "/digilocker": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/digilocker/, ""), // maps /digilocker/consent/verify -> /consent/verify
        },
      },
    },
  };
});
