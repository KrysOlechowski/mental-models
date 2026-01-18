import type { Question, Reveal, UserAnswer } from "./question";

function normalizeIndexes(arr: number[]) {
  return Array.from(new Set(arr)).sort((a, b) => a - b);
}

export function evaluateAnswer(question: Question, answer: UserAnswer): Reveal {
  const correct = normalizeIndexes(question.correctOptionIndexes);

  const picked =
    answer.kind === "mcq+why"
      ? answer.selectedIndex == null
        ? []
        : [answer.selectedIndex]
      : normalizeIndexes(answer.selectedIndexes);

  if (picked.length === 0) {
    return {
      verdict: "unknown",
      matchedCorrectIndexes: [],
      missedCorrectIndexes: correct,
      pickedWrongIndexes: [],
      feedback: "Pick an option first, then explain why.",
    };
  }

  const matched = picked.filter((i) => correct.includes(i));
  const wrong = picked.filter((i) => !correct.includes(i));
  const missed = correct.filter((i) => !picked.includes(i));

  let verdict: Reveal["verdict"] = "incorrect";
  if (wrong.length === 0 && missed.length === 0) verdict = "correct";
  else if (matched.length > 0 && (wrong.length > 0 || missed.length > 0))
    verdict = "partial";

  const feedback =
    verdict === "correct"
      ? "Nice. Your choice matches the underlying model."
      : verdict === "partial"
        ? "You caught part of it, but missed some details."
        : "This is a common trap. Let’s fix the model.";

  return {
    verdict,
    matchedCorrectIndexes: matched,
    missedCorrectIndexes: missed,
    pickedWrongIndexes: wrong,
    feedback,
  };
}
