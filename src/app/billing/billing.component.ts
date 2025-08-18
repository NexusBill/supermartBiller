import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core'; // needed for mat-option
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import {MatSnackBar} from '@angular/material/snack-bar';

export interface Order {
  id: string;
  prodducts: string;
  totalAmount: number;
  discountAmount: string;
  discountValue: string;
  customer: string;
  mobile: string;
  date: Date;
  Savings: string;
}




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
   panelOpenState = signal(false);

   showSidePanel:boolean = false;
   isPanelExpanded: boolean = false;
   loader: boolean = false;
   selectedProducts: any[] = [];
   invoiceId: string = 'INV001';
   intervalId: any;
   ngOnInit() {
    this.loader = true;
    this.fetchFromExcel();
    this.fetchCustomers();
    this.lastOrder();
    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    this.scannedId = '';
    this.holdList=localStorage.getItem('holdList') ? JSON.parse(localStorage.getItem('holdList') || '[]') : [];
   }

   
  ngAfterViewInit() {
    setTimeout(() => {
      this.scannedInputRef.nativeElement.focus();
      this.scannedInputRef.nativeElement.select();
    }, 100);
  }
   private _snackBar = inject(MatSnackBar);

   openSnackBar(message: string, action: string) {
     this._snackBar.open(message, action);
   }
   filteredProducts: any[] = [];

   @ViewChild('productAuto') productAuto!: MatAutocomplete;

 paymentMethod: any;
   discountValue!: number ; // Holds the discount value
   discountType: string = '%'; 
decreaseQuantity(product: any) {
  debugger
  
   if (this.selectedProducts.find(p => p.id === product.id).quantity > 1) {
     this.selectedProducts.find(p => p.id === product.id).quantity--;
     this.totalAmount -= product.MRP; // Update total amount
     this.totalAmount = parseFloat(this.totalAmount.toFixed(2)); // Ensure two decimal places
   } else {
     // If quantity is 1, remove the product from selectedProducts
     this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
   }
   this.totalAmount = this.selectedProducts.reduce((sum, p) => sum + (p.SalePrice * p.quantity), 0);
    this.savedAmount = this.selectedProducts.reduce((sum, p) => sum + (p.MRP - p.SalePrice) * p.quantity, 0);
   this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
   console.log(this.selectedProducts);
 }
 order = new FormData();
customerPoints: number = 0;
 saveOrder(){
  debugger;
  // if (this.selectedProducts.length === 0) {
  //   this.openSnackBar('Please add products to the order', 'Close');
  //   return;
  // }
  // if (!this.selectedCustomer) {
  //   this.openSnackBar('Please select a customer', 'Close');
  //   return;
  // }
  // if (!this.MobileNumber) {
  //   this.openSnackBar('Please enter a mobile number', 'Close');
  //   return;
  // }
  // if (this.totalAmount <= 0) {
  //   this.openSnackBar('Total amount must be greater than zero', 'Close');
  //   return;
  // }
  const body = {
    invoiceId: this.invoiceId,
    customer: this.selectedCustomer ? this.selectedCustomer.name : 'Guest',
    mobile: this.MobileNumber || 'N/A',
    amount: this.totalAmount,
    products: this.selectedProducts,
    savings: this.savedAmount,
    date: new Date().toISOString()
  };
  this.http.post("https://supermartspring.vercel.app/api/orders",body).subscribe( (data:any) =>{
    this.openSnackBar(data.message, 'Close');
    this.selectedProducts = [];
    this.scannedId = '';
    this.totalAmount = 0;
    this.savedAmount = 0; 
    this.discountAmount = 0;
    this.discountValue = 0;
    this.isDiscountApplied = false;
    this.order = new FormData(); // Reset the order FormData
    this.scannedInputRef.nativeElement.focus(); // Reset focus to the scanned input
  })
 }
 formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 01-12
  const day = String(date.getDate()).padStart(2, '0'); // 01-31
  return `${year}-${month}-${day}`;
}


 isDiscountApplied: boolean = false;
 applyDiscount() {
  debugger;
if(this.discountValue && !this.isDiscountApplied){
    if (this.discountType === '%') {
      if (this.discountValue < 0 || this.discountValue > 100) {
        this.openSnackBar('Please enter a valid discount percentage (0-100)', 'Close');
        return;
      }
      this.discountAmount = (this.totalAmount * this.discountValue) / 100;
    } else if (this.discountType === 'Rs') {
      if (this.discountValue < 0 || this.discountValue >= this.totalAmount) {
        this.openSnackBar('Please enter a valid discount amount', 'Close');
        return;
      }
      this.discountAmount = this.discountValue;
    } else {
      this.discountAmount = 0; // Default to 0 if no valid type is selected
    }
    this.isDiscountApplied=true;
    this.totalAmount -= this.discountAmount; // Apply discount to total amount
    this.openSnackBar(`Discount of ${this.discountValue} ${this.discountType} applied`, 'Close');
    this.totalAmount = parseFloat(this.totalAmount.toFixed(2)); // Ensure two decimal places
    }
  else{
    if(this.isDiscountApplied){
      this.totalAmount += this.discountAmount; // Revert discount from total amount
      this.openSnackBar(`Discount of ${this.discountValue} ${this.discountType} Applied Already`, 'Close');
      this.isDiscountApplied = false;
      this.discountAmount = 0; // Reset discount amount
    } else {  
this.openSnackBar('Please enter a valid discount value', 'Close');
this.discountAmount = 0; // Reset discount amount
this.discountValue = 0; // Reset discount value
}
  }
}


@HostListener('window:keydown', ['$event'])
handleKeyDown(event: KeyboardEvent) {
  // Detect F5 (some browsers use key === 'F5', others use keyCode 116)
  if (event.key === 'F5' || event.keyCode === 116) {
    event.preventDefault(); // Stops the browser from refreshing
this.openSnackBar('F5 is clicked', 'Close');
if(this.selectedProducts.length === 0) {
this.openAddPanel();
      return;
    }
    else if(this.selectedProducts.length > 0) {
      this.onHold();
    }
}

  // Detect Escape
  if (event.key === 'Escape' || event.keyCode === 27) {
    this.selectedProducts = [];
    this.scannedId = '';
    this.totalAmount = 0;
    this.savedAmount = 0;
    this.discountAmount = 0;
    this.discountValue = 0;
    this.isDiscountApplied = false;
    this.openSnackBar('Escape is clicked, form reset', 'Close');
    this.scannedInputRef.nativeElement.focus(); // Reset focus to the scanned input
    this.openSnackBar('F5 is clicked', 'Close');}
    if (event.key === 'F6' || event.keyCode === 117) {
      event.preventDefault(); // Stops the browser from refreshing
      this.downloadPDF();
      this.openSnackBar('F6 is clicked', 'Close');
    }
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault(); // Prevents scrolling when space is pressed
      this.scannedInputRef.nativeElement.focus(); // Reset focus to the scanned input
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
  this.totalAmount += scannedProduct.SalePrice;
  this.savedAmount+=(scannedProduct.MRP-scannedProduct.SalePrice);
  this.savedAmount= parseFloat(this.savedAmount.toFixed(2));
  this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
  setTimeout(() => {
    this.scannedInputRef.nativeElement.focus();
    this.scannedInputRef.nativeElement.select();
  }, 0);
  setTimeout(() => this.scrollToBottom(), 0); // wait for DOM update
  this.filteredProducts = [];

}
@ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;



holdFunction(){
  if (this.selectedProducts.length === 0) {
    this.openAddPanel(); // Open the side panel if no products are selected
    return;
  }
  else{
    this.onHold();
  }
}

filterProducts(): void {
  const search = this.scannedId?.trim().toLowerCase();

  // Exit if nothing is typed
  if (!search) {
    this.filteredProducts = [];
    return;
  }

  // Check if input is all digits (number search — allow any length)
  const isNumeric = /^\d+$/.test(search);

  if (!isNumeric && search.length > 3) {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(search)
    );
  } else {
    this.filteredProducts = [];
  }
}


savedAmount: number = 0;
discountAmount: number = 0;




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
   

scannedId:any;


 fetchFromExcel(){
  this.http.get('https://supermartspring.vercel.app/products').subscribe((res: any) => {
    this.products = res;
    console.log(this.products);
  });

}

 
holdList: any[] = [];
onHold() {
  if (this.selectedProducts.length === 0) {
    this.openSnackBar('No products selected to hold', 'Close');
    this.openAddPanel(); // Open the side panel if no products are selected
    return;
  }
  const holdItem = {
    invoice: 'Invoice 1',
    products: [...this.selectedProducts],
    amount: this.totalAmount,
    discount: this.discountAmount,
    savings:this.savedAmount,
    date: new Date().toLocaleString(),
    customer: this.selectedCustomer ? this.selectedCustomer.name : 'Guest',
    mobile: this.MobileNumber || 'N/A' // Ensure mobile number is included
  };
debugger
  this.holdList.push(holdItem); // Now push a plain object instead of FormData
  localStorage.setItem('holdList', JSON.stringify(this.holdList));
  this.selectedProducts = [];
  this.scannedId = '';
  this.totalAmount = 0;
  this.savedAmount = 0;
  this.openSnackBar('Products on hold', 'Close');
}
resumeHold(index: number) {
  const holdItem = this.holdList[index];

  this.selectedProducts = [...holdItem.products];
  this.totalAmount = holdItem.amount;
  this.savedAmount = holdItem.savings || 0;
  this.discountAmount = holdItem.discount || 0;
  this.selectedCustomer = { name: holdItem.customer }; // Make sure this matches your actual customer structure

  // Remove the resumed item from the hold list
  this.holdList.splice(index, 1);

  this.openSnackBar('Resumed held invoice', 'Close');
  this.closeSidePanel();
}



@ViewChild('scannedInput') scannedInputRef!: ElementRef;
//@ViewChild('scannedInput') scannedInputRef!: ElementRef;
  // Reset focus and select input text
 


selectInput(input: HTMLInputElement): void {
  setTimeout(() => input.select(), 0); // Helps scanners overwrite
}

  products: any[] = [
   
  ];
  editingProduct: any = null;
  onQuantityChange(product: any) {
    debugger
    if (product.quantity < 1) {
      product.quantity = 1; // Ensure quantity is at least 1
    }
    let productExists = this.selectedProducts.find(p => p.id === product.id);
    if (productExists) {
      productExists.quantity = product.quantity; // Update quantity in selected products
      this.totalAmount = this.selectedProducts.reduce((sum, p) => sum + (p.SalePrice * p.quantity), 0);
      this.savedAmount = this.selectedProducts.reduce((sum, p) => sum + (p.MRP - p.SalePrice) * p.quantity, 0);
      this.savedAmount = parseFloat(this.savedAmount.toFixed(2));
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    } else {
      this.selectedProducts.push({ ...product }); // Add new product with updated quantity
      this.totalAmount += product.SalePrice * product.quantity; 
      this.savedAmount += (product.MRP - product.SalePrice) * product.quantity;
      this.savedAmount = parseFloat(this.savedAmount.toFixed(2));
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    }
  }
  deleteProduct(product: any) {
    this.discountAmount = 0; // Reset discount amount when deleting a product
    this.discountValue = 0; // Reset discount value when deleting a product
    this.isDiscountApplied = false; // Reset discount applied state
    this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
    this.totalAmount -= product.SalePrice * product.quantity;
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
      this.totalAmount += product.MRP ;
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
      return;
    }
   else{
      debugger
      product.stock -= product.quantity;
      this.selectedProducts = [...this.selectedProducts, product];
      this.totalAmount += product.MRP ;
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    }
  }
  resetForm() {
    this.editingProduct = null;
  }
  
  
  openAddPanel() {
    // if(this.holdList.length === 0) {
    //   this.openSnackBar('No hold items available', 'Close');
    //   return;
    // }
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
  customers: any[] = [];
  isPrinting: boolean = false;
  isDiscountApplicable: boolean = false;
  discountMetrics: any;
  totalAmount: number = 0;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private scrollToBottom() {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
  downloadPDF(){
this.isPrinting = true;
  }
  currentDate: Date = new Date();
  selectedCustomer: any = null;
  MobileNumber: any = null;
  onCustomerChange(event: any) {
    const customerId = +event.target.value;
    this.selectedCustomer = this.customers.find(customer => customer.id === customerId);
    if (this.selectedCustomer) {
      this.MobileNumber = this.selectedCustomer.mobile;
      this.customerPoints = this.selectedCustomer.points || 0; // Set customer points if available
    } else {
      this.MobileNumber = null; // Reset mobile number if no customer is selected
      this.customerPoints = 0; // Reset points if no customer is selected
    }
  }
  fetchCustomers(){
    this.http.get('https://supermartspring.vercel.app/customers').subscribe((res: any) => {
      this.customers = res;
      console.log(this.customers);
    });
  }


  
  lastOrder() {
    debugger;
    this.http.get('https://supermartspring.vercel.app/api/orders').subscribe((res: any) => {
      debugger
      const now = new Date();
  
      // Short month name like "Sep"
      const month = now.toLocaleString("en-US", { month: "short" });
    
      // Year like "2025"
      const year = now.getFullYear();
    
      // Sequence = current count + 1
      const seq = res.length + 1;
    
this.invoiceId = `INV${month}${year}${seq}`;
    });
  }

 

  constructor(private router: Router, private http: HttpClient) {

  }
}
