import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';


import {MatSnackBar} from '@angular/material/snack-bar';

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
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
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
  //  displayedColumns: string[] = ['id',	'name',	'Category',	'QuantityOnHand'	,'UnitDesc',	'RetailPrice',	'SalePrice',	'MRP'	,'UnitPrice',	'EANCode','Action'];

  displayedColumns: string[] = ['name', 'mrp', 'unit', 'quantity', 'price', 'action'];
  dataSource = ELEMENT_DATA;
   panelOpenState = signal(false);
   showSidePanel:boolean = false;
   isPanelExpanded: boolean = false;
   loader: boolean = false;
   selectedProducts: any[] = [];
   ngOnInit() {
    this.fetchFromExcel()  ;
   }
   private _snackBar = inject(MatSnackBar);

   openSnackBar(message: string, action: string) {
     this._snackBar.open(message, action);
   }
   filteredProducts: any[] = [];

   filterProducts() {
     this.filteredProducts = this.products.filter(product =>
       product.name.toLowerCase().includes(this.scannedId.toLowerCase())
     );
   }
 paymentMethod: any;
   discountValue!: number ; // Holds the discount value
   discountType: string = '%'; 
decreaseQuantity(product: any) {
  debugger
  
   this.loader = true;
   if (this.selectedProducts.find(p => p.id === product.id).quantity > 1) {
     this.selectedProducts.find(p => p.id === product.id).quantity--;
     this.totalAmount -= product.MRP; // Update total amount
     this.totalAmount = parseFloat(this.totalAmount.toFixed(2)); // Ensure two decimal places
   } else {
     // If quantity is 1, remove the product from selectedProducts
     this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
   }
   this.loader = true;
   this.totalAmount = this.selectedProducts.reduce((sum, p) => sum + (p.SalePrice * p.quantity), 0);
    this.savedAmount = this.selectedProducts.reduce((sum, p) => sum + (p.MRP - p.SalePrice) * p.quantity, 0);
   this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
   console.log(this.selectedProducts);
 }
 applyDiscount() {
  debugger;


  if(this.isDiscountApplicable){

if(this.discountValue){

    if (this.discountType === '%') {
      this.discountAmount = (this.totalAmount * this.discountValue) / 100;
    } else if (this.discountType === 'Rs') {
      this.discountAmount = this.discountValue;
    } else {
      this.discountAmount = 0; // Default to 0 if no valid type is selected
    }
    this.totalAmount -= this.discountAmount; // Apply discount to total amount
    this.totalAmount = parseFloat(this.totalAmount.toFixed(2)); // Ensure two decimal places
    this.discountValue = 0; // Reset discount value after applying
  }
  else{
this.openSnackBar('Please enter a valid discount value', 'Close');
}
}
}
 increaseQuantity(product: any) {
   debugger
 
   if (!this.selectedProducts.find(p => p.id === product.id)) {
     this.selectedProducts.push({ ...product, quantity: 1 });
   }
   // Increment the quantity of the product in the selectedProducts array
  else{
   this.selectedProducts.find(p => p.id === product.id).quantity++;
  }
   this.loader = true;
 this.totalAmount += product.SalePrice;
  this.savedAmount+=(product.MRP-product.SalePrice);
  this.savedAmount= parseFloat(this.savedAmount.toFixed(2));
  this.totalAmount = parseFloat(this.totalAmount.toFixed(2));   
 }
 

 onCodeResult() {
  debugger;
  this.scannedId = this.scannedId.trim(); // Trim whitespace from scannedId

  // Find product in master list
  let scannedProduct = this.products.find(product =>
    product.id.toString() === this.scannedId || product.name === this.scannedId
  );

  // Exit if not found or empty
  if (!scannedProduct || this.scannedId.length === 0) {
    console.log('Product not found in the list or scannedId is empty');
    return;
  }

  console.log('Scanned code:', this.scannedId);

  // Check if product is already present in the selectedProducts array
  const existingProduct = this.selectedProducts.find(product =>
    product.id.toString() === this.scannedId || product.name === this.scannedId
  );

  if (!existingProduct) {
    // If not present, push with quantity = 1
    this.selectedProducts.push({ ...scannedProduct, quantity: 1 });
  } else {
    // If already present, increase quantity
    existingProduct.quantity++;
  }

  // Update total amount
  this.loader = true;
  this.totalAmount += scannedProduct.SalePrice;
  this.savedAmount+=(scannedProduct.MRP-scannedProduct.SalePrice);
  this.savedAmount= parseFloat(this.savedAmount.toFixed(2));
  this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
  this.scannedId= ''; // Clear scannedId after processing
}

savedAmount: number = 0;
discountAmount: number = 0;



    scriptURL :string = 'https://script.google.com/macros/s/AKfycbzekjxHW9Uwf_Gg3U4m4bZaxjFeqbqJ9YNfAG7Z_30SyLMcAFfNe-dsFpgATMC_e3Cp/exec';

    newProduct :any = {
     id: 'P001',
     name: 'Product 1',
     Category: 'General',
     quantity: 1,
     UnitDesc: 'pcs',
     RetailPrice: 100,
     SalePrice: 90,
     MRP: 120,
     UnitPrice: 85
   };
   savedata(){
   this.http.post(this.scriptURL, this.newProduct).subscribe(res => {
    debugger;
     console.log('Posted to Google Sheet', res);
   });
  }

scannedId:any;


fetchFromExcel(){
  const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json';
  this.http.get(url, { responseType: 'text' }).subscribe((res: string) => {
   
    debugger;
    const json = JSON.parse(
      res.substring(47).slice(0, -2)
    );
    const rows = json.table.rows;
  
   
    this.products = rows.map((row: any) => ({ 
      id: row.c[0]?.v || '',
      name: row.c[1]?.v || '',
      Category: row.c[2]?.v || '',
      quantity: 1,
      UnitDesc:  row.c[4]?.v || '',
      RetailPrice:  row.c[5]?.v || 0,
      SalePrice: row.c[6]?.v || 0,
      MRP:  row.c[7]?.v || 0,
      UnitPrice: row.c[8]?.v || 0,
      EANCode:  row.c[9]?.v || '', 
    }));
    console.log(this.products);

  });

}




  products: any[] = [
   
  ];
  editingProduct: any = null;
  onQuantityChange(product: any) {
    debugger
    if (product.quantity < 1) {
      product.quantity = 1; // Ensure quantity is at least 1
    }
    this.loader = true;
    let productExists = this.selectedProducts.find(p => p.id === product.id);
    if (productExists) {
      productExists.quantity = product.quantity; // Update quantity in selected products
      this.totalAmount = this.selectedProducts.reduce((sum, p) => sum + (p.MRP * p.quantity), 0);
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    } else {
      this.selectedProducts.push({ ...product }); // Add new product with updated quantity
      this.totalAmount += product.MRP * product.quantity; 
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    }
  }
  deleteProduct(product: any) {
    this.loader = true;
    this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
    this.totalAmount -= product.MRP * product.quantity;
    this.savedAmount -= (product.MRP - product.SalePrice) * product.quantity;
    this.savedAmount = parseFloat(this.savedAmount.toFixed(2));
    this.totalAmount = parseFloat(this.totalAmount.toFixed(2));     
  }
  addToCart(product: any) {
    debugger
    let productExists = this.selectedProducts.find(p => p.id === product.id);
    if (productExists) {
      product.stock -= product.quantity;
      productExists.quantity +=1;
      this.loader = true;
      this.totalAmount += product.MRP ;
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
      return;
    }
   else{
      debugger
      product.stock -= product.quantity;
      this.loader = true;
      this.selectedProducts = [...this.selectedProducts, product];
      this.totalAmount += product.MRP ;
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    }
  }
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
 
   closeProductsPanel(): void {
     this.isPanelExpanded = false;
     this.showSidePanel = false;
     this.editingProduct = null;
     this.resetForm();
   }
   onPanelClosed(): void {
     this.isPanelExpanded = false;
   }
 
  editProduct(product: any) {
    this.editingProduct = { ...product }; // Create a copy of the product for editing
    this.showSidePanel = true;
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

  constructor(private router: Router, private http: HttpClient) {

  }
}
