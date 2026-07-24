import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // base: command === "build" ? "/SDEV_255_Final_Project_Group_3/" : "/",
  base: "/SDEV_255_Final_Project_Group_3/",
  build: {
    outDir: "docs",
  },
}));