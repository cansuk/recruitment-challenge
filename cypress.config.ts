import { defineConfig } from "cypress";
import fs from "fs";
import path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    setupNodeEvents(on, config) {
      const dataFile = path.join(
        process.cwd(),
        "cypress",
        "fixtures",
        "submissions.json",
      );
      on("task", {
        resetSubmissions() {
          fs.mkdirSync(path.dirname(dataFile), { recursive: true });
          fs.writeFileSync(dataFile, JSON.stringify([], null, 2), "utf-8");
          return null;
        },
        seedSubmissions(payload: { items: unknown[] }) {
          fs.mkdirSync(path.dirname(dataFile), { recursive: true });
          const items = Array.isArray(payload.items) ? payload.items : [];
          fs.writeFileSync(dataFile, JSON.stringify(items, null, 2), "utf-8");
          return null;
        },
      });
      return config;
    },
  },
});
