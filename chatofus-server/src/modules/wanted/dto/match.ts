export interface Match {
  item: string;
  original: string;
  key: string;
  score: number;
  match: { index: number; length: number };
}
