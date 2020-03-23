import { ShoppingItem } from './shopping.model';
import { ShoppingState } from '../reducer/shopping.reducer';

export interface AppState {
  readonly shopping: ShoppingState;
}
