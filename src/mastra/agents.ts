import { makeAgent, type AgentModel } from "../core.js";
export const instructions = "Explain only observed workflow and trace evidence. Traces describe recorded operations, not hidden chain of thought or proof of correctness. Use Markdown with fenced code.";
export function createTutor(model?: AgentModel) { return makeAgent("lesson-8-tutor", "Lesson 8 tutor", instructions, model); }
export const tutor = createTutor();
