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
    this.loader = true;
    this.fetchFromExcel();
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
  debugger;
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


async fetchFromExcel(){
  const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json';
await  this.http.get(url, { responseType: 'text' }).subscribe((res: string) => {
   
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
this.loader = false;
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

  this.holdList.push(holdItem); // Now push a plain object instead of FormData
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
    this.loader = true;
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
    this.loader = true;
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
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private scrollToBottom() {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
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

  constructor(private router: Router, private http: HttpClient) {

  }
}
