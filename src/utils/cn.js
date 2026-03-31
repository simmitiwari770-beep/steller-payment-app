import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes
 * Resolves conflicts between conditional classes and default classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
