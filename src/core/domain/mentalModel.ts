export type MentalModel =
  | "time-ordering"
  | "identity-reference"
  | "state-snapshot"
  | "mutation-immutability";

export const MentalModelLabels: Record<MentalModel, string> = {
  "time-ordering": "Time & Ordering",
  "identity-reference": "Identity & Reference",
  "state-snapshot": "State & Snapshot",
  "mutation-immutability": "Mutation & Immutability",
};
