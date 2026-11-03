import { mkdirSync } from "node:fs";
import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { Observability, MastraStorageExporter, SensitiveDataFilter } from "@mastra/observability";
import { tutor } from "./agents.js";
import { inspectLesson } from "./workflows.js";
mkdirSync(".mastra", { recursive: true });
export const storage = new LibSQLStore({ id: "lesson-eight-local", url: "file:./.mastra/traces.db" });
export const mastra = new Mastra({ agents: { tutor }, workflows: { inspectLesson }, storage, server: { port: 4208 },
  observability: new Observability({ configs: { default: { serviceName: "lesson08-app", exporters: [new MastraStorageExporter()], spanOutputProcessors: [new SensitiveDataFilter()] } } }) });
