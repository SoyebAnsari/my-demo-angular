import {Injectable} from '@angular/core';
import { Actions, Effect , ofType} from '@ngrx/effects'
import { LoadShoppingAction, ShoppingActionTypes, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction } from '../actions/shopping.actions';
import { CustomerService } from 'src/app/customer.service';
import { mergeMap , switchMap ,map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { ShoppingItem } from '../models/shopping.model';


@Injectable()
export class ShoppingEffects {
    constructor(public actions$: Actions, public shoppingService: CustomerService ){

    }
    @Effect()
    loadShopping$ = this.actions$
         .pipe(
            ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
            switchMap(() => this.shoppingService.getShoppingItems()
                    .pipe(
                        map(data => new LoadShoppingSuccessAction(data) ),
                        catchError(error => of(new LoadShoppingFailureAction(error)))
                    )
            )
    );

    @Effect()
    addShopping$ = this.actions$
         .pipe(
            ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
            switchMap((action: AddItemAction) => this.shoppingService.addShoppingItem(action.payload)
                    .pipe(
                        map(( ) => new AddItemSuccessAction(action.payload) ),
                        catchError(error => of(new AddItemFailureAction(error)))
                    )
            )
    );
}
