import { ProcessingData } from "../types";

/**
 * Simulates basic NLP preprocessing steps:
 * 1. Lowercasing
 * 2. Removing Punctuation
 * 3. Tokenization
 */
export const processText = (text: string): ProcessingData => {
  const original = text;
  
  // 1. Lowercase
  const lowercased = original.toLowerCase();

  // 2. Remove Punctuation (keep alphanumeric and spaces)
  // We allow basic latin characters, numbers and spaces. 
  // Replacing everything else with empty string or space.
  const noPunctuation = lowercased.replace(/[^\w\s]|_/g, "");

  // 3. Tokenize (split by whitespace and filter empty strings)
  const tokens = noPunctuation.split(/\s+/).filter(t => t.length > 0);

  return {
    original,
    lowercased,
    noPunctuation,
    tokens,
    tokenCount: tokens.length
  };
};
