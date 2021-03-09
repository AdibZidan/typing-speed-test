import { Views } from '../views/views.interface';
import { Words } from '../words/words.interface';

export interface AppState {
  words: Words,
  views: Views;
  color: string;
  totalErrors: number;
  wordsPerMinute: number;
}
