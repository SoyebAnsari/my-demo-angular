import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer/customer.model';
import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ShoppingItem } from './store/models/shopping.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  ROOT_URL = 'http://localhost:3000';
  customerSub = new Subject<Customer>();

  constructor(public http: HttpClient) { }

  addCustomer(customer: Customer): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`${this.ROOT_URL}/customers`, customer );
  }

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.ROOT_URL}/customers`);
  }

  getShoppingItems() {
    return this.http.get<ShoppingItem[]>(`${this.ROOT_URL}/shopping`)
      .pipe(
        delay(3000)
      );

  }

  addShoppingItem(shoppingItem : ShoppingItem){
    return this.http.post(`${this.ROOT_URL}/shopping` , shoppingItem)
    .pipe(
      delay(3000)
    );
  }

  deleteShoppingItem(id: number){
    return this.http.delete(`${this.ROOT_URL}/shopping/${id}`)
    .pipe(
      delay(3000)
    );
  }
}
