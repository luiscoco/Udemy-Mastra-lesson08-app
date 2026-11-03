import { EntityType } from "@mastra/core/storage";
import { mastra, storage } from "./mastra/index.js";
import { traceInput } from "./mastra/workflows.js";
import { createTutor } from "./mastra/agents.js";
import { assertActive, generateAnswer, modelId, type AgentModel, type Emit, type LabResult } from "./core.js";
export const inputSchema = traceInput;
export async function executeLab(raw: unknown, emit: Emit, signal: AbortSignal): Promise<LabResult> {
  const input = inputSchema.parse(raw); assertActive(signal);
  emit({ type: "stage", text: "Starting the registered workflow with the native storage trace exporter enabled." });
  const run = await mastra.getWorkflow("inspectLesson").createRun();
  const result = await run.start({ inputData: input });
  await mastra.observability.flush(); assertActive(signal);
  const store = await storage.getStore("observability");
  const traces = input.includeTrace && store ? await store.listTraces({ filters: { entityType: EntityType.WORKFLOW_RUN, entityId: "inspect-lesson", runId: run.runId }, pagination: { page: 0, perPage: 1 } }) : null;
  const traceId = traces?.spans[0]?.traceId;
  const trace = traceId && store ? await store.getTrace({ traceId }) : null;
  const evidence = trace ? { traceId, runId: run.runId, spans: trace.spans.map(span => ({ name: span.name, spanType: span.spanType, spanId: span.spanId, parentSpanId: span.parentSpanId, startedAt: span.startedAt, endedAt: span.endedAt })) } : null;
  return { status: result.status === "success" && result.result.found ? "pass" : "needs-attention", summary: "The native workflow executed. Recorded spans describe operations; they do not prove content correctness.",
    data: { runId: run.runId, sdkStatus: result.status, result: result.status === "success" ? result.result : null, storedTraces: evidence, studio: "npm run studio; follow the printed address (selected port 4208)", hiddenReasoningExposed: false } };
}
export const liveModel = (_?: unknown) => modelId();
export async function executeLive(raw: unknown, question: string, emit: Emit, signal: AbortSignal, model?: AgentModel) {
  const report = await executeLab(raw, emit, signal);
  const result = await generateAnswer(model ? createTutor(model) : mastra.getAgent("tutor"), `${question}\nObserved evidence: ${JSON.stringify(report.data)}`, emit, signal);
  await mastra.observability.flush(); return result;
}
export async function dispose() { await mastra.observability.flush(); await mastra.observability.shutdown(); }
