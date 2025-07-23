import { Component } from '@angular/core';
import { TableviewComponent } from '../tableview/tableview.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,MatTableModule, FormsModule,TableviewComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';
  customertype: string = '';
  customerAddress: string = '';
  customerCity: string = '';

  addCustomer() {
    if (this.customerName.trim() === '' || this.customerEmail.trim() === '' || this.customerPhone.trim() === '') {
      alert('Please fill all the required fields');
      this.customerData = [...this.customerData, { name: this.customerName, email: this.customerEmail, phone: this.customerPhone }];
      this.clear();
    }
    else {
      this.customerData = [...this.customerData, { name: this.customerName, email: this.customerEmail, phone: this.customerPhone }];
      this.clear();
      alert('Customer added successfully');
    }
  }
  clear() {
    this.customerName = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.customertype = '';
    this.customerAddress = '';
    this.customerCity = '';
  }
  customerData = [
    { name: 'John Doe', email: 'kvjdhfjkshf', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'fhgfgh', phone: '987-654-3210' },
    { name: 'Alice Johnson', email: 'ghfghfgh', phone: '555-555-5555' },
    { name: 'Bob Brown', email: 'ghfghfgh', phone: '444-444-4444' },
    { name: 'Charlie White', email: 'ghfghfgh', phone:    '333-333-3333' }
  ];
  ColumnHeaders = ['Customer Name', 'Email', 'Phone'];
  displayedColumns = ['name', 'email', 'phone'];
}
