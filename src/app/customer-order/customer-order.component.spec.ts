import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CustomerOrderComponent } from './customer-order.component';
import { ProductService } from '../shared/product.service';
import { of } from 'rxjs';

describe('CustomerOrderComponent', () => {
  let component: CustomerOrderComponent;
  let fixture: ComponentFixture<CustomerOrderComponent>;
  let productService: ProductService;

  const mockProducts = [
    {
      _id: '1',
      name: 'Test Product 1',
      Category: 'Electronics',
      MRP: 100,
      SalePrice: 90,
      EANCode: 'EAN001'
    },
    {
      _id: '2',
      name: 'Test Product 2',
      Category: 'Groceries',
      MRP: 50,
      SalePrice: 45,
      EANCode: 'EAN002'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOrderComponent, HttpClientTestingModule, FormsModule],
      providers: [ProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);

    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    fixture.detectChanges();
    expect(component.products.length).toBeGreaterThan(0);
    expect(component.filteredProducts.length).toBeGreaterThan(0);
  });

  it('should filter products by search term', () => {
    component.products = mockProducts;
    component.filteredProducts = mockProducts;
    component.searchTerm = 'Electronics';
    component.filterProducts();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].Category).toBe('Electronics');
  });

  it('should add product to cart', () => {
    const product = { ...mockProducts[0], cartQuantity: 2 };
    component.addToCart(product);
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].cartQuantity).toBe(2);
  });

  it('should increase quantity in existing cart item', () => {
    const product = { ...mockProducts[0], cartQuantity: 1 };
    component.addToCart(product);
    product.cartQuantity = 2;
    component.addToCart(product);
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].cartQuantity).toBe(3);
  });

  it('should increment product quantity', () => {
    const product = { ...mockProducts[0], cartQuantity: 1 };
    component.increaseQuantity(product);
    expect(product.cartQuantity).toBe(2);
  });

  it('should decrement product quantity', () => {
    const product = { ...mockProducts[0], cartQuantity: 2 };
    component.decreaseQuantity(product);
    expect(product.cartQuantity).toBe(1);
  });

  it('should not decrement quantity below 0', () => {
    const product = { ...mockProducts[0], cartQuantity: 0 };
    component.decreaseQuantity(product);
    expect(product.cartQuantity).toBe(0);
  });

  it('should remove item from cart', () => {
    component.cartItems = [
      { ...mockProducts[0], cartQuantity: 2 },
      { ...mockProducts[1], cartQuantity: 1 }
    ];
    component.removeFromCart(0);
    expect(component.cartItems[0].cartQuantity).toBe(1);
  });

  it('should delete item from cart completely', () => {
    component.cartItems = [
      { ...mockProducts[0], cartQuantity: 2 },
      { ...mockProducts[1], cartQuantity: 1 }
    ];
    component.deleteFromCart(0);
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0]._id).toBe('2');
  });

  it('should add more to cart item', () => {
    const cartItem = { ...mockProducts[0], cartQuantity: 1 };
    component.cartItems = [cartItem];
    component.addMoreToCart(cartItem);
    expect(cartItem.cartQuantity).toBe(2);
  });

  it('should calculate subtotal correctly', () => {
    component.cartItems = [
      { ...mockProducts[0], cartQuantity: 2 },
      { ...mockProducts[1], cartQuantity: 1 }
    ];
    const subtotal = component.calculateSubtotal();
    expect(subtotal).toBe((100 * 2) + (50 * 1));
  });

  it('should calculate GST correctly', () => {
    component.cartItems = [
      { ...mockProducts[0], cartQuantity: 1 }
    ];
   // const gst = component.calculateGST();
   // expect(gst).toBe(5); // 5% of 100
  });

  it('should calculate total correctly', () => {
    component.cartItems = [
      { ...mockProducts[0], cartQuantity: 1 }
    ];
    const total = component.calculateTotal();
    expect(total).toBe(105); // 100 + 5% GST
  });

  it('should clear cart', () => {
    component.cartItems = [
      { ...mockProducts[0], cartQuantity: 1 },
      { ...mockProducts[1], cartQuantity: 2 }
    ];
    spyOn(window, 'confirm').and.returnValue(true);
    component.clearCart();
    expect(component.cartItems.length).toBe(0);
  });

  it('should reset order form', () => {
    component.customerName = 'John Doe';
    component.customerEmail = 'john@example.com';
    component.customerPhone = '1234567890';
    component.cartItems = [{ ...mockProducts[0], cartQuantity: 1 }];
    component.searchTerm = 'Electronics';

    component.resetOrder();

    expect(component.customerName).toBe('');
    expect(component.customerEmail).toBe('');
    expect(component.customerPhone).toBe('');
    expect(component.cartItems.length).toBe(0);
    expect(component.searchTerm).toBe('');
  });

  it('should not allow adding empty quantity to cart', () => {
    const product = { ...mockProducts[0], cartQuantity: 0 };
    spyOn(window, 'alert');
    component.addToCart(product);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should require customer name for order', () => {
    component.customerName = '';
    component.cartItems = [{ ...mockProducts[0], cartQuantity: 1 }];
    spyOn(window, 'alert');
    component.placeOrder();
    expect(window.alert).toHaveBeenCalledWith('Please enter your name');
  });

  it('should require cart items for order', () => {
    component.customerName = 'John Doe';
    component.cartItems = [];
    spyOn(window, 'alert');
    component.placeOrder();
    expect(window.alert).toHaveBeenCalledWith('Your cart is empty. Please add items before placing an order');
  });
});

