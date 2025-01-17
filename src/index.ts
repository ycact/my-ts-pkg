import { aa } from "./aa";

/**
 * Converts a number between different bases
 * @param value The input value to convert
 * @param fromBase The base to convert from
 * @param toBase The base to convert to
 * @returns The converted number as a string
 */
export function myTsPkg(
  value: string,
  fromBase: number,
  toBase: number
): string {
  const decimal = parseInt(value, fromBase);
  return decimal.toString(toBase);
}

export { aa }
