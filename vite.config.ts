import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/I-ll-think-of-something/",
  plugins: [react()],
  publicDir: "public"
})
