import { Component } from '@angular/core';
import { TableviewComponent } from '../tableview/tableview.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,MatTableModule ,FormsModule,TableviewComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  constructor( private http : HttpClient,private toasterService:ToastrService) {
    this.getCustomers(); 
   }
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';
  customertype: string = '';
  customerAddress: string = '';
  customerCity: string = '';
  customerPoints: number = 0;
  showEditModal = false;
  editingCustomer: any = null;

  addCustomer() {
    if (this.customerName.trim() === '' || this.customerEmail.trim() === '' || this.customerPhone.trim() === '') {
      this.toasterService.error("Please Fill Mandatoy fields");
      this.customerData = [...this.customerData, { name: this.customerName, email: this.customerEmail, phone: this.customerPhone }];
      this.clear();
    }
    else {
      this.customerData = [...this.customerData, { name: this.customerName, email: this.customerEmail, phone: this.customerPhone }];
      this.http.post('/customers', {
        name: this.customerName,
        email: this.customerEmail,
        phone: this.customerPhone,
        type: this.customertype,
        address: this.customerAddress,
        city: this.customerCity,
        points: this.customerPoints
      }).subscribe((response) => {
        debugger;
        this.toasterService.success("Customer Added Successfully")
        console.log('Customer added successfully', response); 
      }, (error) => {
        console.error('Error adding customer', error);
        this.toasterService.error("Error adding customer");
      });
      this.customerName = '';
      this.clear();
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
    this.http.put(`/customers/${customer.id}`, {
      name: this.customerName,
      email: this.customerEmail,
      phone: this.customerPhone,
      type: this.customertype,
      address: this.customerAddress,
      city: this.customerCity,
      points: this.customerPoints
    }).subscribe((response) => {
      this.toasterService.success("Customer updated successfully");
    }, (error) => {
      console.error('Error updating customer', error);
    });
  }



  getCustomers() {
    this.http.get('/customers?page=1&limit=100000').subscribe((response: any) => {

      console.log('Customers fetched successfully', response);
      this.customerData = response.data;
      this.toasterService.success("Customers Fetched");
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

  onTableAction(event: { row: any; action: string }) {
    if (event.action === 'edit') {
      this.openEditModal(event.row);
    }
  }

  openEditModal(customer: any) {
    this.editingCustomer = { ...customer };
    this.showEditModal = true;
  }

  saveCustomerEdit() {
    if (!this.editingCustomer) {
      return;
    }

    const customerId = this.editingCustomer?._id;
    this.http.put(`/customers/${customerId}`, {
      name: this.editingCustomer.name,
      email: this.editingCustomer.email,
      phone: this.editingCustomer.phone,
      type: this.editingCustomer.type,
      address: this.editingCustomer.address,
      city: this.editingCustomer.city,
      points: this.editingCustomer.points
    }).subscribe((response) => {
      const index = this.customerData.findIndex((c: any) => c.id === customerId);
      if (index !== -1) {
        this.customerData[index] = { ...this.editingCustomer };
      }
      this.showEditModal = false;
      this.editingCustomer = null;
      console.log('Customer updated successfully', response);
    }, (error) => {
      console.error('Error updating customer', error);
    });
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingCustomer = null;
  }

  customerData :any[]= [];
  ColumnHeaders = ['Customer Name', 'Email', 'Phone', 'Type', 'Address', 'City', 'Points', 'Actions'];
  displayedColumns = ['name', 'email', 'phone', 'type', 'address', 'city', 'points', 'actions'];
}
