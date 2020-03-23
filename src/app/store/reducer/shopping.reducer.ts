import { ShoppingItem } from '../models/shopping.model';
import { ShoppingAction, ShoppingActionTypes } from '../actions/shopping.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/app.state.model';

export interface ShoppingState {
    list: ShoppingItem[];
    loading: boolean;
    error: Error;
}

const initialState: ShoppingState = {
    list: [],
    loading: false,
    error: undefined
};


export function ShoppingReducer(state: ShoppingState = initialState, action: ShoppingAction) {
    switch (action.type) {
        case ShoppingActionTypes.LOAD_SHOPPING:
            return {
                ...state,
                loading: true
            };
        case ShoppingActionTypes.LOAD_SHOPPING_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false
            };

        case ShoppingActionTypes.LOAD_SHOPPING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        
            case ShoppingActionTypes.ADD_ITEM:
            return {
                ...state,
                loading: true
            };
        case ShoppingActionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload],
                loading: false
            };

        case ShoppingActionTypes.LOAD_SHOPPING_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }
}

// export const getShoppingState = createFeatureSelector<AppState>('shopping');

// // createSelector to obtain references to properties further down our state tree
// export const getAllShoppingItems = createSelector(
//   getShoppingState,
//   state => state.shopping
// );
