import type { LessonMetadata } from "./core.js";

export const LESSON = {
  "number": 8,
  "title": "Mastra Studio and Execution Inspection",
  "shortTitle": "Studio and inspection",
  "eyebrow": "EXECUTE · TRACE · INSPECT",
  "hero": "Inspect an",
  "accent": "actual execution.",
  "description": "Run a traced Mastra workflow, persist its native telemetry locally, and inspect the same registered components in Mastra Studio.",
  "labTitle": "Record a lookup execution",
  "labDescription": "The local lab runs a real workflow and uses MastraStorageExporter with LibSQL. Inspect its native trace metadata and distinguish execution success from the task result.",
  "localMode": "Real workflow and native stored trace · no model call",
  "defaultQuestion": "Look up lesson 8 and explain one useful execution-inspection question.",
  "objectives": [
    {
      "title": "Launch the real Studio",
      "text": "npm run studio starts the pinned Mastra CLI on port 4208. The host, agents, workflow and telemetry are actual SDK components."
    },
    {
      "title": "Record native execution evidence",
      "text": "A registered two-step workflow creates a trace. The app flushes the native exporter and checks the persisted trace instead of manufacturing a timeline."
    },
    {
      "title": "Inspect the lifecycle",
      "text": "Follow validated input, lookup, formatting and the final task result. Traces describe observed execution rather than guaranteed access to hidden reasoning."
    },
    {
      "title": "Separate two outcome levels",
      "text": "The SDK can complete a workflow whose business result reports a missing lesson. Inspect the task contract as well as runtime success."
    },
    {
      "title": "Use bounded local storage",
      "text": "Trace data is written to this app's ignored .mastra directory. Metrics aggregation and external telemetry export are not configured."
    },
    {
      "title": "Diagnose before editing",
      "text": "Locate whether the issue is input, registration, a tool, a workflow step or provider access. Change the relevant boundary and rerun the same task."
    }
  ],
  "workflow": [
    "Validate the lookup task",
    "Start the registered Mastra workflow",
    "Record lookup and formatting spans",
    "Persist native trace data in LibSQL",
    "Flush and inspect the recorded trace",
    "Open Studio for development inspection"
  ],
  "scope": "This app configures actual native tracing and local trace storage. It does not publish telemetry externally, expose hidden chain-of-thought, configure aggregate metrics or replace application tests.",
  "examples": [
    {
      "name": "Trace a successful lookup",
      "input": {
        "lessonId": 8,
        "includeTrace": true
      },
      "expected": "A real workflow result and persisted native trace metadata."
    },
    {
      "name": "Trace a missing record",
      "input": {
        "lessonId": 999,
        "includeTrace": true
      },
      "expected": "A trace of the execution with a missing-record business outcome."
    }
  ],
  "sourceFiles": [
    "src/lab.ts",
    "src/mastra/index.ts",
    "src/mastra/workflows.ts",
    "src/mastra/agents.ts"
  ],
  "exercise": "Compare the successful and missing-record traces. Explain why a completed workflow can still need a corrected task input. Open Studio and inspect the registered workflow.",
  "checks": [
    {
      "question": "Is the displayed timeline invented by the app?",
      "answer": "The application events describe actual operations. Native trace metadata comes from the configured Mastra exporter and storage; the two are labelled separately."
    },
    {
      "question": "Does a trace prove every answer is correct?",
      "answer": "No. It is execution evidence that must be compared with the task and returned source data."
    },
    {
      "question": "Will app-host and Studio runs share process-local state?",
      "answer": "They are separate processes. They can inspect the same configured local trace database, while an application's transient event callbacks belong to its own run."
    }
  ],
  "docs": [
    {
      "title": "Observability configuration",
      "url": "https://mastra.ai/docs/observability/overview"
    },
    {
      "title": "Mastra workflows",
      "url": "https://mastra.ai/docs/workflows/overview"
    }
  ],
  "readmeWorkflow": [
    {
      "step": "Initialize local tracing",
      "component": "src/mastra/index.ts",
      "behavior": "Configure LibSQL storage, native Observability, MastraStorageExporter and SensitiveDataFilter."
    },
    {
      "step": "Run actual workflow",
      "component": "src/mastra/workflows.ts",
      "behavior": "Execute inspectLesson and its inspect-record step over the public catalog."
    },
    {
      "step": "Flush and query storage",
      "component": "src/lab.ts",
      "behavior": "Flush the exporter and list the trace filtered to the current runId."
    },
    {
      "step": "Read recorded spans",
      "component": "src/lab.ts",
      "behavior": "Read the stored trace and project names, span types, parent ids and timestamps."
    }
  ],
  "liveWorkflow": [
    "The traced catalog workflow runs first.",
    "The registered tutor explains the observed evidence and its limitations; tracing is flushed afterward."
  ],
  "outcomeNotes": [
    "A missing lesson record is a business failure even when the workflow executes successfully.",
    "Recorded spans are operational evidence; they do not expose hidden reasoning or prove an answer correct.",
    "npm run studio uses mastra dev; server.port selects 4208. Runtime data under .mastra is ignored by Git.",
    "This LibSQL example demonstrates traces, not aggregate metrics."
  ]
} satisfies LessonMetadata;
