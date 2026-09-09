import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Maryam & Michael",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool(), // lets you run GROQ queries in the studio — useful for debugging
  ],

  schema: {
    types: schemaTypes,
  },
});
