import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core'; // needed for mat-option
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-billing',
  imports: [CommonModule, FormsModule,NgxPrintModule,MatTableModule,MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatExpansionModule,],
  templateUrl: './billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)',
        height: '*'
      })),
      state('out', style({
        opacity: 0,
        transform: 'translateY(-20px)',
        height: '0px',
        overflow: 'hidden'
      })),
      transition('in <=> out', animate('300ms ease-in-out'))
    ])
  ],
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'Action'];
  dataSource = ELEMENT_DATA;
   panelOpenState = signal(false);
   showSidePanel:boolean = false;
   isPanelExpanded: boolean = false;
   loader: boolean = false;
   products = [
    {
      id: 1,
      name: 'Fresh Milk',
      category: 'dairy',
      price: 3.99,
      originalPrice: 4.99,
      stock: 25,
      quantity: 1,
      description: 'Fresh whole milk, rich in calcium and protein',
      image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Fresh+Milk'
    },
    {
      id: 2,
      name: 'Organic Apples',
      category: 'fruits',
      price: 5.99,
      stock: 15,
      quantity: 1,
      description: 'Crisp and sweet organic apples, perfect for snacking',
      image: 'https://via.placeholder.com/300x200/FFB6C1/000000?text=Organic+Apples'
    },
    {
      id: 3,
      name: 'Whole Grain Bread',
      category: 'bakery',
      price: 2.99,
      stock: 8,
      quantity: 1,
      description: 'Freshly baked whole grain bread, healthy and delicious',
      image: 'https://via.placeholder.com/300x200/DEB887/000000?text=Whole+Grain+Bread'
    },
    {
      id: 4,
      name: 'Premium Beef',
      category: 'meat',
      price: 15.99,
      stock: 0,
      quantity: 1,
      description: 'High-quality beef cuts, perfect for grilling',
      image: 'https://via.placeholder.com/300x200/CD853F/000000?text=Premium+Beef'
    },
    {
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },
    {
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },
    {
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },
    {
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },
    {
      id: 6,
      name: 'Orange Juice',
      category: 'beverages',
      price: 4.99,
      stock: 20,
      quantity: 1,
      description: '100% pure orange juice, no added sugar',
      image: 'https://via.placeholder.com/300x200/FFA500/000000?text=Orange+Juice'
    }
  ];
  editingProduct: any = null;
  resetForm() {
    this.editingProduct = null;
  }
  
  openAddPanel() {
    this.showSidePanel = true;
    this.editingProduct = null;
    this.resetForm();
  };
  closeSidePanel() {
    this.showSidePanel = false;
    this.editingProduct = null;
    this.resetForm();
  }
   onPanelOpened(): void {
     this.isPanelExpanded = true;
   }
 
   onPanelClosed(): void {
     this.isPanelExpanded = false;
   }
 
   addToCart(productName: string, price: number): void {
     console.log(`Added ${productName} (₹${price}) to cart!`);
   }
  customers = [
    {
      id: 1,
      name: 'Kaviyarasan',
      phone: '9994305384'
        },
    {
      id: 2,
      name: 'John Doe',
      phone: '9876543210',
    },
    {
      id: 3,
      name: 'Jane Smith',
      phone: '9123456789'    }
  ];
  isPrinting: boolean = false;
  isDiscountApplicable: boolean = false;
  discountMetrics: any;
  totalAmount: number = 0;
  toggleDiscount() {
    this.isDiscountApplicable = !this.isDiscountApplicable;
    if (this.isDiscountApplicable) {
      console.log('Discount is now applicable');
    } else {
      console.log('Discount is no longer applicable');
    }
  }
  downloadPDF(){
this.isPrinting = true;
this.loader = true;
  }
  currentDate: Date = new Date();
  selectedCustomer: any = null;
  MobileNumber: any = null;
  onCustomerChange(event: any) {
    const customerId = +event.target.value;
    this.selectedCustomer = this.customers.find(customer => customer.id === customerId);
  }
}
