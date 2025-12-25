import { Component } from '@angular/core';
import { TableviewComponent } from '../tableview/tableview.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,MatTableModule,HttpClientModule ,FormsModule,TableviewComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  constructor( private http : HttpClient) {
    this.getCustomers(); 
   }
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';
  customertype: string = '';
  customerAddress: string = '';
  customerCity: string = '';
  customerPoints: number = 0;

  addCustomer() {
    if (this.customerName.trim() === '' || this.customerEmail.trim() === '' || this.customerPhone.trim() === '') {
      alert('Please fill all the required fields');
      this.customerData = [...this.customerData, { name: this.customerName, email: this.customerEmail, phone: this.customerPhone }];
      this.clear();
    }
    else {
      this.customerData = [...this.customerData, { name: this.customerName, email: this.customerEmail, phone: this.customerPhone }];
      this.http.post('https://supermartspring.vercel.app/customers', {
        name: this.customerName,
        email: this.customerEmail,
        phone: this.customerPhone,
        type: this.customertype,
        address: this.customerAddress,
        city: this.customerCity,
        points: this.customerPoints
      }).subscribe((response) => {
        debugger
        console.log('Customer added successfully', response); 
      }, (error) => {
        console.error('Error adding customer', error);
      });
      this.customerName = '';
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

  
editCustomer(customer: any) {
    this.customerName = customer.name;
    this.customerEmail = customer.email;
    this.customerPhone = customer.phone;
    this.customertype = customer.type;
    this.customerAddress = customer.address;
    this.customerCity = customer.city;
    this.customerPoints = customer.points;
    this.http.put(`https://supermartspring.vercel.app/customers/${customer.id}`, {
      name: this.customerName,
      email: this.customerEmail,
      phone: this.customerPhone,
      type: this.customertype,
      address: this.customerAddress,
      city: this.customerCity,
      points: this.customerPoints
    }).subscribe((response) => {
      console.log('Customer updated successfully', response);
    }, (error) => {
      console.error('Error updating customer', error);
    });
  }



  getCustomers() {
    this.http.get('https://supermartspring.vercel.app/api/nexus_supermart/customers?page=1&limit=100000').subscribe((response: any) => {

      console.log('Customers fetched successfully', response);
      this.customerData = response.data;
      this.customerData.forEach((customer: any) => {
        customer.name = customer.name || 'Guest';
        customer.email = customer.email || 'Please provide email';
        customer.phone = customer.phone || 'phone';
        customer.type = customer.type || 'Regular';
        customer.address = customer.address || 'Please provide address';
        customer.city = customer.city || 'please provide city';
        customer.points = customer.points || 0;
      }
    )}, (error) => {
      console.error('Error fetching customers', error);
    });
  }
  customerData :any[]= [];
  ColumnHeaders = ['Customer Name', 'Email', 'Phone', 'Type', 'Address', 'City', 'Points', 'Actions'];
  displayedColumns = ['name', 'email', 'phone', 'type', 'address', 'city', 'points', 'actions'];
}
