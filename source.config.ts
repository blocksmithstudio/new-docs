// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

// v10: return { docs, meta } sekalian
export const { docs, meta } = defineDocs({
  dir: "content/docs",
  // kalau mau, bisa tambah schema/mdxOptions di sini
});

export default defineConfig({
  mdxOptions: {
    // opsi MDX (opsional)
  },
});
