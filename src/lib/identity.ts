/** ENTITY IDENTITY — declared once at the gate, for entertainment only. */
export const SPECIES = ["human", "reptilian", "other", "dontKnow"] as const;
export type Species = (typeof SPECIES)[number];

export function isSpecies(value: unknown): value is Species {
  return typeof value === "string" && (SPECIES as readonly string[]).includes(value);
}
