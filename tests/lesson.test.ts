import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("native storage contains workflow trace evidence", async () => {
  const result = await run(LESSON.examples[0].input);
  const data = result.data as { runId: string; storedTraces: { runId: string; spans: { spanType: string }[] } };
  assert(data.runId); assert(data.storedTraces);
  assert(JSON.stringify(data.storedTraces).includes("inspect-lesson"), "Trace storage must contain the actual workflow identity");
  assert.equal(data.storedTraces.runId, data.runId);
  assert(data.storedTraces.spans.some(span => span.spanType === "workflow_step"));
  const missing = await run(LESSON.examples[1].input);
  assert.equal(missing.status, "needs-attention");
});
