import { describe, it, expect } from "vitest";
import { evaluateAnswer } from "./evaluateAnswer";
import type { Question } from "./question";

const baseQuestion: Question = {
  id: "q1",
  model: "identity-reference",
  title: "Reference equality",
  prompt: "What is true?",
  answerSpec: { kind: "mcq+why", options: ["A", "B"] },
  correctOptionIndexes: [0],
  trap: "Assuming deep equality",
  explanation: "JS compares references, not structure.",
};

describe("evaluateAnswer", () => {
  it("returns correct for exact match", () => {
    const result = evaluateAnswer(baseQuestion, {
      kind: "mcq+why",
      selectedIndex: 0,
      why: "Because references",
    });

    expect(result.verdict).toBe("correct");
  });

  it("returns incorrect for wrong option", () => {
    const result = evaluateAnswer(baseQuestion, {
      kind: "mcq+why",
      selectedIndex: 1,
      why: "Guess",
    });

    expect(result.verdict).toBe("incorrect");
  });

  it("returns unknown when nothing selected", () => {
    const result = evaluateAnswer(baseQuestion, {
      kind: "mcq+why",
      selectedIndex: null,
      why: "",
    });

    expect(result.verdict).toBe("unknown");
  });
});
