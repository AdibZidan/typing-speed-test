import { Views } from '../views/views.interface';
import { Words } from '../words/words.interface';

export interface AppState {
  color: string;
  totalErrors: number;
  timer: number;
  views: Views;
  wordsPerMinute: number;
  words: Words,
}
