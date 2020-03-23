import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app.state.model';
import { Observable } from 'rxjs';
import { ShoppingItem } from './store/models/shopping.model';
import { AddItemAction, LoadShoppingAction } from './store/actions/shopping.actions';
import { CustomerService } from './customer.service';
import { Customer } from './customer/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-practice';
  id = 10;
  shoppingItems$: Observable<ShoppingItem[]>;
  loader$: Observable<boolean>;
  error$: Observable<Error> ;

  constructor(private store: Store<AppState> , public customerService: CustomerService) {

  }

  ngOnInit(): void {
    this.loader$ = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);
    this.shoppingItems$ = this.store.select(store => store.shopping.list);
    this.store.dispatch(new LoadShoppingAction());
  }

  add(sname: HTMLInputElement): void {

    this.id = Math.random() * 100000 ;
    const shoppingItem: ShoppingItem = {
      id: this.id,
      name: sname.value
    };

    this.store.dispatch(new AddItemAction(shoppingItem));

  }

  addCustomer(cname: string, ccompany: string): void{
    this.id = Math.random() * 100000;
    const customer: Customer = {
      id: this.id,
      name: cname,
      company: ccompany
    };

    this.customerService.addCustomer(customer)
      .subscribe((newCustomer: Customer) => {
        alert('Customer Added Successfully');
        this.customerService.customerSub.next(newCustomer);
      });
  }

  addItem(name) {
    const item  = {
      id: Math.round(Math.random() * 1000),
      name: name.value
    };
    this.store.dispatch(new AddItemAction(item) );
  }

} 
