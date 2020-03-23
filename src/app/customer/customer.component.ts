import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from './customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  title = 'List of customers';

  customers: Customer[] = [];
  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomer()
      .subscribe((customers: Customer[]) =>{
        this.customers = customers;
      });

    this.customerService.customerSub
      .subscribe((customer: Customer) =>{
        this.customers.push(customer);
    });
  }

}
