import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { course } from "../course.js";
export const traceInput = z.object({ lessonId: z.number().int().min(1).max(999), includeTrace: z.boolean() }).strict();
const output = z.object({ found: z.boolean(), title: z.string().nullable() });
const inspect = createStep({ id: "inspect-record", inputSchema: traceInput, outputSchema: output,
  execute: async ({ inputData }) => { const record = course.find(item => item.id === inputData.lessonId); return { found: Boolean(record), title: record?.title || null }; } });
export const inspectLesson = createWorkflow({ id: "inspect-lesson", inputSchema: traceInput, outputSchema: output }).then(inspect).commit();
