import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

interface Product {
  id: number;
  name: string;
  Category: string;
  MRP: number;
  UnitPrice?: number;
  UnitDesc?: string;
  EANCode?: string;
  RetailPrice?: number;
  SalePrice?: number;
  QuantityOnHand?: number;
}
@Component({
  selector: 'app-products',
  imports: [CommonModule,HttpClientModule,FormsModule,MatTableModule, MatFormFieldModule,
    MatExpansionModule,
   MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  
MatCheckboxModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [HttpClient],
})


export class ProductsComponent {
  searchTerm: string = '';
  selectedCategory: string = '';
  priceRange: string = '';
  stockFilter: string = '';
  sortBy: string = 'name';
  displayedColumns:any[] = [];
  idMap = new Map<string, any>();
  nameMap = new Map<string, any>();

  userMessage: string = '';
  // invokeBedrock(prompt: string) {
  //   debugger;
  //   const sessionId = 'session-' + new Date().getTime();
  //   this.bedrockService.invokeAgent(prompt, sessionId)
  //     .then(response => {
  //       console.log('Bedrock Agent Response:', response);
  //       this.openSnackBar('Bedrock Agent Response received', 'Close');
  //     })
  //     .catch(error => {
  //       console.error('Error invoking Bedrock Agent:', error);
  //       this.openSnackBar('Error invoking Bedrock Agent', 'Close');
  //     });
  // }
  // Pagination variables
  pageSize = 100; // Number of items per page
  currentPage = 1;
  totalPages = 0;
  pagedProducts: any[] = [];
  constructor(private http: HttpClient) {
    this.  fetchFromExcel();
    this.isLoader= true;
   /// this.invokeBedrock('show my leave balance details');
  }
  isLoader: boolean = false;
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
 
 @ViewChild(MatPaginator) paginator!: MatPaginator;

   dataSource = new MatTableDataSource<any>([]);
 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(value: string) {
  this.dataSource.filter = value.trim().toLowerCase();
}
fetchFromExcel() {
  this.isLoader = true;

  this.http
    .get<any>("https://supermartspring.vercel.app/api/nexus_supermart/products?page=1&limit=100000")
    .subscribe(res => {

      this.products = res.data;
      this.filteredProducts = [...this.products];
this.dataSource.data= this.products;
      this.displayedColumns = [
        'select',  
        "EANCode",
        "name",
        "category",
        "SellType",
        "QuantityOnHand",
        "price",
        "SalePrice",
        "action"
      ];

      this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
      this.setPage(1);

      this.isLoader = false;
    });
}

//   fetchFromExcel(){
//     this.isLoader= true;
//     // const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json&gid=1958443453';
//     // this.http.get(""url"", { responseType: 'text' }).subscribe((res: string) => {
     
//     //   debugger;
//     //   const json = JSON.parse(
//     //     res.substring(47).slice(0, -2)
//     //   );
//     //   const rows = json.table.rows;
    
     
//     //   this.products = rows.map((row: any) => ({ 
//     //     id: Number(row.c[0]?.v || 0), // Convert id to a number
//     //     name: row.c[1]?.v || '',
//     //     Category: row.c[2]?.v || '',
//     //     quantity: 1,
//     //     UnitDesc:  row.c[4]?.v || '',
//     //     RetailPrice:  row.c[5]?.v || 0,
//     //     SalePrice: row.c[6]?.v || 0,
//     //     MRP:  row.c[7]?.v || 0,
//     //     UnitPrice: row.c[8]?.v || 0,
//     //     EANCode:  row.c[9]?.v || '', 
//     //   }));
//     //   console.log(this.products);
//     this.http.get('https://supermartspring.vercel.app/api/nexus_supermart/products?page=1&limit=10').subscribe((res: any) => {
//       debugger;
//       this.products = res.data;
//       console.log(this.products);
//       this.filteredProducts = [...this.products];
//  // Build maps for O(1) search
//  this.buildLookupMaps();

//  // Initialize pagination
//  this.filteredProducts = [...this.products];
//  this.totalPages = res.total;
//  this.setPage(res.page);
//  this.isLoader = false;
//     });

//   }

////https://script.google.com/macros/s/AKfycbzekjxHW9Uwf_Gg3U4m4bZaxjFeqbqJ9YNfAG7Z_30SyLMcAFfNe-dsFpgATMC_e3Cp/exec
buildLookupMaps() {
  // this.idMap.clear();
  // this.nameMap.clear();

  // for (const p of this.products) {
  //   this.idMap.set(p.id.toString(), p);
  //   this.nameMap.set(p.name.toLowerCase(), p);
  // }
}

setPage(page: number) {
   this.totalPages= this.totalPages/10;
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;

  const startIndex = (page - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
}



  addNewProduct() {
    debugger;
    this.showSidePanel = true;
    let a = this.idMap.get(this.productForm.id);
    if (a) {
      this.openSnackBar('Product with this ID already exists', 'Close') ;
      return;
    }
 if(this.editingProduct) {
      // Update existing product
      debugger;
      this.http.put(`https://supermartspring.vercel.app/products/${this.productForm.id}`, this.productForm).subscribe(res => {
        this.fetchFromExcel(); // Refresh the product list
        this.showSidePanel = false; // Close the side panel after updating
        console.log('Product updated successfully', res);
        this.openSnackBar('Product updated successfully', 'Close');
      }, error => {
        console.error('Error updating product', error);
        this.openSnackBar('Error updating product', 'Close');
      });
 }
 else {
    this.http.post('https://supermartspring.vercel.app/products', this.productForm).subscribe(res => {
      debugger;
      this.fetchFromExcel(); // Refresh the product list
      this.showSidePanel = false; // Close the side panel after adding
      console.log('New product added to Google Sheet', res);
      this.openSnackBar('New product added successfully', 'Close');
    }, error => {
      console.error('Error adding new product', error);
      this.openSnackBar('Error adding new product', 'Close');
    });
    this.resetForm();
  }
  }
  products: any[] = [];
  filteredProducts: any[] = [];

  // Method implementations
  onSearch() {
    this.filterProducts();
  }

  onCategoryChange() {
    this.filterProducts();
  }

  onPriceRangeChange() {
    this.filterProducts();
  }

  onStockFilterChange() {
    this.filterProducts();
  }

  onSortChange() {
    this.sortProducts();
  }


  
selection = new SelectionModel<any>(true, []); // true = multi select
selectedProducts: any[] = [];
/** Whether all rows are selected */
isAllSelected() {
  
  const numSelected = this.selection.selected.length;
  console.log("numSelected------------->"+numSelected);
  this.selectedProducts = this.selection.selected;
  console.log("selected------------->"+this.selectedProducts);
  const numRows = this.pagedProducts.length;
  return numSelected === numRows;
}

/** Selects all rows if not all selected; otherwise clear selection */
masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
  } else {
    this.pagedProducts.forEach(row => this.selection.select(row));
  }
}

/** Checkbox label (optional, accessibility) */
checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
}
  filterProducts() {
    let filtered = [...this.products];

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.id.toString().includes(this.searchTerm) ||
        product.Category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.Category === this.selectedCategory);
    }

    // Price range filter
    if (this.priceRange) {
      debugger
      const [min, max] = this.priceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(product => {
        if (max) {
          return product.MRP >= parseInt(min) && product.MRP <= parseInt(max);
        } else {
          return product.MRP >= parseInt(min);
        }
      });
    }

    // Stock filter
    // if (this.stockFilter) {
    //   filtered = filtered.filter(product => {
    //     switch (this.stockFilter) {
    //       case 'in-stock': return product.stock > 10;
    //       case 'low-stock': return product.stock > 0 && product.stock <= 10;
    //       case 'out-of-stock': return product.stock === 0;
    //       default: return true;
    //     }
    //   });
    // }



    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.setPage(1); // Reset to first page after filtering
    this.pagedProducts = this.filteredProducts.slice(0, this.pageSize);
    this.sortProducts();
  }
 selectedFile!: any;

  private CLOUDINARY_URL =
    'https://api.cloudinary.com/v1_1/djbelgg05/image/upload';

  private UPLOAD_PRESET = 'kamatchi_products';


previewUrl: string | ArrayBuffer | null = null;
uploadName: string = '';
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.setPreview(file);
  }
}
onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
}


onDrop(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer?.files.length) {
    this.setPreview(event.dataTransfer.files[0]);
  }
}

setPreview(file: File) {
  this.selectedFile = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.previewUrl = reader.result;
  };
  reader.readAsDataURL(file);
}



  uploadImage() {
    if (!this.selectedFile) return;
if(this.selectedProducts.length==0){
//this.toastMessage = 'Please select at least one product to upload image';
return this.openSnackBar('Please select at least one product to upload image', 'Close');
}
else{
  this.isLoader=true;
    console.log('Uploading image for product:', this.selectedProducts);
   const formData = new FormData();  
    formData.append('file', this.selectedFile);                // same as Postman
    formData.append('upload_preset', this.UPLOAD_PRESET);      // same
    formData.append('public_id', this.uploadName);                  // same
    this.http.post(this.CLOUDINARY_URL, formData)
      .subscribe({
        next: (res: any) => {
                  debugger;
                    this.selection.clear();
    this.http.put(`https://supermartspring.vercel.app/api/nexus_supermart/products/products/images/bulk`, {"products":this.selectedProducts,"name":this.uploadName}).subscribe(res => {
                 this.openSnackBar('Image uploaded successfully  ','Close');

      this.fetchFromExcel();
    }, error => {
      console.error('Error updating product', error);
                  this.isLoader=false;
    });
    this.uploadName="";
    this.previewUrl = null;
   this.selectedFile= null;
          console.log('Upload success:', res);
          console.log('Image URL:', res.secure_url);
                      this.isLoader=false;
        },
        error: (err) => {
            this.isLoader=false;
          console.error('Upload failed:', err);
        }
      });
    

  
}
   
  }
  imageUploader(event: any, product: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        product.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  sortProducts() {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'quantity':
          return a.quantity - b.quantity;
        default:
          return a.id - b.id; // Default sort by ID
      }
    });
  }

  increaseQuantity(product: any) {
    if (product.quantity < product.stock) {
      product.quantity++;
    }
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  validateQuantity(product: any) {
    if (product.quantity < 1) {
      product.quantity = 1;
    } else if (product.quantity > product.stock) {
      product.quantity = product.stock;
    }
  }

  addToCart(product: any) {
    console.log(`Added ${product.quantity} x ${product.name} to cart`);
    // Implement cart logic here
  }

  removeFromCart(product: any) {
    console.log(`Removed ${product.name} from cart`);
    // Implement remove logic here
  }

  getStockBadgeClass(stock: number) {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 10) return 'low-stock';
    return 'in-stock';
  }

  getStockText(stock: number) {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 10) return 'Low Stock';
    return 'In Stock';
  }
  

  categories =[
    'Stationary',
    'plastic',
    'Rice',
    'snacks',
    'Food',
    'Balm',
    'Pooja Items',
    'Mob',
    'Cleaning',
    'Health item',
    'Mosquito',
    'oil',
    'soap',
    'Ice Cream',
    'Naga',
    'tea',
    'washing',
    'Face Cream',
    'Battery',
    'Vegtebles',
    'Jawin',
    'Talc Power',
    'Cosmetics',
    'Shaving',
    'Tooth paste',
    'Tooth Brush',
    'Milk Item',
    'Hair Dye',
    'agarbattis',
    'Playing Items',
    'Baby Item',
    'Spray',
    'Choclate',
    'Own packing',
    'Scissors',
    'Surfe',
    'Cooldrings',
    'Fiama',
    'Annai brand',
    'Fire Sick',
    'Vicks',
    'Udhayam',
    'Bread',
    'Sunfeast',
    'Nestle',
    'paste',
    'Birthday'
  ]
  ;
  unitDesc = ['Nos', "Kg", "Dozen", 'Ltr', 'Packet', 'Bottle', 'Box', 'Pouch', 'Tin', 'Piece'];

  showSidePanel = false;
  editingProduct: Product | null = null;
  
  // Form data
  productForm = {
    id:'',
    name: '',
    Category: '',
    price: 0,
    UnitDesc: '',
    RetailPrice: 0, 
    SalePrice: 0,
    MRP: 0,
    UnitPrice: 0,
    EANCode: '',
    quantity: 10
  };
  @ViewChild('confirmationModal') confirmationMdal!: ElementRef;

  showModal = false;

  // Open the modal
  openModal() {
    this.showModal = true;
  }

  // Close the modal
  closeModal() {
    this.showModal = false;
  }

  // When user clicks "Yes"
  confirmSave() {
    this.closeModal();
    this.addNewProduct(); // Call your actual save logic
  }
  @ViewChild('productId') productIdField!: ElementRef<HTMLInputElement>;

  openAddPanel() {
    this.showSidePanel = true;
    this.editingProduct = null;
    this.resetForm();
  
    // Wait for the panel to render, then focus the input
    setTimeout(() => {
      this.productIdField.nativeElement.focus();
    });
  }

  openEditPanel(product: Product) {
    debugger;
    this.showSidePanel = true;
    this.editingProduct = product;
    this.productForm = {
      name: product.name,
      UnitDesc: product.UnitDesc || '',
      RetailPrice: product.RetailPrice || 0,
      SalePrice: product.SalePrice || 0,
      MRP: product.MRP || 0,
      UnitPrice: product.UnitPrice || 0,
      EANCode: product.EANCode || '',
      Category: product.Category,
      price: product.MRP,
      id: product.id.toString(), // Ensure id is a string for the form
      quantity: product.QuantityOnHand || 10 // Default to 10 if not provided

    };
  }

  closeSidePanel() {
    this.showSidePanel = false;
    this.editingProduct = null;
    this.resetForm();
  }

  // saveProduct() {
  //   if (this.productForm.name && this.productForm.category && this.productForm.price > 0) {
  //     if (this.editingProduct) {
  //       // Update existing product
  //       const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
  //       if (index !== -1) {
  //         this.products[index] = {
  //           ...this.editingProduct,
  //           ...this.productForm
  //         };
  //       }
  //     } else {
  //       // Add new product
  //       const newProduct: Product = {
  //         id: this.products.length + 1,
  //         ...this.productForm
  //       };
  //       this.products.push(newProduct);
  //     }
  //     this.closeSidePanel();
  //   }
  // }

  deleteProduct(product: any) {
    if (!product || !product._id) {
      this.openSnackBar('Invalid product', 'Close');
      return;
    }
    this.http.delete(`https://supermartspring.vercel.app/products/${product._id}`).subscribe(res => {
      this.openSnackBar('Product deleted successfully', 'Close');
      this.fetchFromExcel(); // Refresh the product list
    }, error => {
      console.error('Error deleting product', error);
      this.openSnackBar('Error deleting product', 'Close');
    });
  }

  selectInput(input: HTMLElement,event: Event): void {
    event.preventDefault(); // stops the form from submitting
    setTimeout(() => input.focus(), 0); // Helps scanners overwrite
  }
  private resetForm() {
    this.productForm = {
      id:'',
      name: '',
      UnitDesc: '',
      RetailPrice: 0,
      SalePrice: 0,
      MRP: 0,
      UnitPrice: 0,
      EANCode: '',
      Category: '',
      price: 0,
      quantity: 10
    };
  }
}
