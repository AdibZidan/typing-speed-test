import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { Views } from '../views/views.interface';

export interface AppState {
  difficulty: Difficulty,
  views: Views;
}
