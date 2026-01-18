import { MentalModel } from "./mentalModel";

export type QuestionId = string;

export type CodeSnippet = {
  language: "js" | "ts" | "css" | "html" | "json";
  code: string;
  highlightLines?: number[];
};

export type HybridAnswerSpec =
  | { kind: "mcq+why"; options: string[]; allowMultiple?: false }
  | { kind: "multi+why"; options: string[]; allowMultiple: true };

export type Question = {
  id: QuestionId;
  model: MentalModel;

  title: string; // short: shown in list / header
  prompt: string; // main question text (EN)

  snippets?: CodeSnippet[];

  answerSpec: HybridAnswerSpec;

  // canonical evaluation target
  correctOptionIndexes: number[]; // for mcq -> length 1, for multi -> length >=1

  // reveal: teaching content
  trap: string; // common wrong assumption
  explanation: string; // correction / mental model update
  references?: { label: string; url: string }[]; // optional (can be added later)
};

export type UserAnswer =
  | { kind: "mcq+why"; selectedIndex: number | null; why: string }
  | { kind: "multi+why"; selectedIndexes: number[]; why: string };

export type AnswerVerdict = "correct" | "incorrect" | "partial" | "unknown";

export type Reveal = {
  verdict: AnswerVerdict;
  matchedCorrectIndexes: number[];
  missedCorrectIndexes: number[];
  pickedWrongIndexes: number[];
  feedback: string; // short, human-friendly
};
