import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatExpansionModule],
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
  displayedColumns: string[] = ['id', 'name', 'category', 'MRP', 'quantity', 'Action'];


  constructor(private http: HttpClient) {
    this.  fetchFromExcel();
    this.isLoader= true;
  }
  isLoader: boolean = false;
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  fetchFromExcel(){
    this.isLoader= true;
    const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json&gid=1958443453';
    this.http.get(url, { responseType: 'text' }).subscribe((res: string) => {
     
      debugger;
      const json = JSON.parse(
        res.substring(47).slice(0, -2)
      );
      const rows = json.table.rows;
    
     
      this.products = rows.map((row: any) => ({ 
        id: Number(row.c[0]?.v || 0), // Convert id to a number
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
      this.isLoader= false;
      this.products = [...this.products.sort((a, b) => a.id - b.id)];
      this.filteredProducts = [...this.products];

    });

  }

  addNewProduct() {
    debugger;
    this.showSidePanel = true;
    this.editingProduct = null; // Reset editing product

this.products.filter(p => p.id === this.productForm.id).length > 0 ?
      this.openSnackBar('Product with this ID already exists', 'Close') :true;

  
    // this.http.post('https://script.google.com/macros/s/AKfycbzekjxHW9Uwf_Gg3U4m4bZaxjFeqbqJ9YNfAG7Z_30SyLMcAFfNe-dsFpgATMC_e3Cp/exec', this.productForm).subscribe(res => {
    //   console.log('New product added to Google Sheet', res);
    //   this.openSnackBar('New product added successfully', 'Close');
    // }, error => {
    //   console.error('Error adding new product', error);
    //   this.openSnackBar('Error adding new product', 'Close');
    // });
    this.resetForm();
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
    this.sortProducts();
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
  quantities = [10, 25, 50, 100, 200, 500];

  showSidePanel = false;
  editingProduct: Product | null = null;
  
  // Form data
  productForm = {
    id:'',
    name: '',
    category: '',
    price: 0,
    quantity: 10
  };

  openAddPanel() {
    this.showSidePanel = true;
    this.editingProduct = null;
    this.resetForm();
  }

  openEditPanel(product: Product) {
    this.showSidePanel = true;
    this.editingProduct = product;
    this.productForm = {
      name: product.name,
      category: product.Category,
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

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  private resetForm() {
    this.productForm = {
      id:'',
      name: '',
      category: '',
      price: 0,
      quantity: 10
    };
  }
}
