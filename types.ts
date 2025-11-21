export interface ProcessingData {
  original: string;
  lowercased: string;
  noPunctuation: string;
  tokens: string[];
  tokenCount: number;
}

export type QuestionState = 'IDLE' | 'PROCESSING' | 'LOADING_ANSWER' | 'COMPLETED' | 'ERROR';
