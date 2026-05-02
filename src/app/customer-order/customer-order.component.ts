import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../shared/product.service';

interface Product {
  _id: string;
  name: string;
  Category: string;
  MRP?: number;
  SalePrice?: number;
  RetailPrice?: number;
  UnitPrice?: number;
  UnitDesc?: string;
  EANCode?: string;
  cartQuantity?: number;
}

interface CartItem extends Product {
  cartQuantity: number;
}

@Component({
  selector: 'app-customer-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css'
})
export class CustomerOrderComponent implements OnInit {
  // Product & Cart data
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cartItems: CartItem[] = [];

  // UI State
  isLoading: boolean = false;
  searchTerm: string = '';
  orderPlaced: boolean = false;
  orderId: string = '';

  // Customer Info
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }


  showCart: boolean = false;

  toggleCart(): void {
    this.showCart = !this.showCart;
  }
  /**
   * Load all products from ProductService
   */
  loadProducts(): void {
    this.isLoading = true;
    
   this.http
  .get<any>("/products?page=1&limit=10")
  .subscribe({
    next: (res) => {
      debugger
      this.products = res.data;
      this.filteredProducts = [...this.products];

        this.products = this.products.map((p: any) => ({
          ...p,
          cartQuantity: 1
        }));
        this.filteredProducts = [...this.products];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Filter products by search term
   */
  filterProducts(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.Category.toLowerCase().includes(term) ||
      product.EANCode?.toLowerCase().includes(term)
    );
  }

  /**
   * Increment product quantity
   */
  increaseQuantity(product: Product): void {
    if (!product.cartQuantity) product.cartQuantity = 1;
    product.cartQuantity++;
  }

  /**
   * Decrement product quantity
   */
  decreaseQuantity(product: Product): void {
    if (!product.cartQuantity) product.cartQuantity = 0;
    if (product.cartQuantity > 0) {
      product.cartQuantity--;
    }
  }

  /**
   * Add product to cart
   */
  addToCart(product: Product): void {
    debugger
    if (!product.cartQuantity || product.cartQuantity <= 0) {
      alert('Please select a quantity greater than 0');
      return;
    }

    const existingItem = this.cartItems.find(item => item._id === product._id);

    if (existingItem) {
      // Increase quantity if already in cart
      existingItem.cartQuantity += product.cartQuantity;
    } else {
      // Add new item to cart
      const cartItem: CartItem = { ...product, cartQuantity: product.cartQuantity };
      this.cartItems.push(cartItem);
    }

    // Reset product quantity
    product.cartQuantity = 1;
    
    // Show feedback
    this.showNotification(`${product.name} added to cart!`);
  }

  /**
   * Add more quantity of existing cart item
   */
  addMoreToCart(item: CartItem): void {
    item.cartQuantity++;
  }

  /**
   * Remove one item from cart
   */
  removeFromCart(index: number): void {
    if (this.cartItems[index].cartQuantity > 0) {
      this.cartItems[index].cartQuantity--;
    }
  }

  /**
   * Delete item completely from cart
   */
  deleteFromCart(index: number): void {
    this.cartItems.splice(index, 1);
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartItems = [];
    }
  }

  /**
   * Calculate subtotal
   */
  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      const price = item.MRP || item.SalePrice || item.RetailPrice || 0;
      return total + (price * item.cartQuantity);
    }, 0);
  }

  /**
   * Calculate GST (5%)
   */
  // calculateGST(): number {
  //   return Math.round(this.calculateSubtotal() * 0.05 * 100) / 100;
  // }

  /**
   * Calculate total amount
   */
  calculateTotal(): number {
    return Math.round((this.calculateSubtotal() ) * 100) / 100;
  }

  /**
   * Place order
   */
  placeOrder(): void {
    if (!this.customerName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order');
      return;
    }

    // Prepare order payload
    const orderPayload = {
      customerName: this.customerName,
      customerEmail: this.customerEmail || null,
      customerPhone: this.customerPhone || null,
      items: this.cartItems.map(item => ({
        productId: item._id,
        productName: item.name,
        quantity: item.cartQuantity,
        unitPrice: item.MRP || item.SalePrice || 0,
        totalPrice: (item.MRP || item.SalePrice || 0) * item.cartQuantity
      })),
      subtotal: this.calculateSubtotal(),
      total: this.calculateTotal(),
      orderDate: new Date().toISOString(),
      status: 'pending'
    };

    // Send order to backend
    this.http.post('/orders', orderPayload).subscribe({
      next: (response: any) => {
        this.orderId = response._id || response.id || 'ORD-' + Date.now();
        this.orderPlaced = true;
        this.resetOrder();
        this.showNotification('Order placed successfully!');
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.orderPlaced = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
    });
  }

  /**
   * Reset order form
   */
  resetOrder(): void {
    this.customerName = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.cartItems = [];
    this.filteredProducts = [...this.products];
    this.searchTerm = '';
  }

  /**
   * Show notification (simple alert, can be replaced with toastr)
   */
  private showNotification(message: string): void {
    console.log(message);
    // Could integrate with ToastrService or NgxNotify here
  }
}
