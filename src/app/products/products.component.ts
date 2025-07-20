import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}
@Component({
  selector: 'app-products',
  imports: [CommonModule,FormsModule,MatTableModule, MatFormFieldModule,
    MatExpansionModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})


export class ProductsComponent {
  searchTerm: string = '';
  selectedCategory: string = '';
  priceRange: string = '';
  stockFilter: string = '';
  sortBy: string = 'name';
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'quantity', 'Action'];
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
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
      id: 5,
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 2.49,
      stock: 30,
      quantity: 1,
      description: 'Fresh leafy spinach, packed with iron and vitamins',
      image: 'https://via.placeholder.com/300x200/90EE90/000000?text=Fresh+Spinach'
    },{
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

  filteredProducts = [...this.products];

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
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Price range filter
    if (this.priceRange) {
      const [min, max] = this.priceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= parseInt(min) && product.price <= parseInt(max);
        } else {
          return product.price >= parseInt(min);
        }
      });
    }

    // Stock filter
    if (this.stockFilter) {
      filtered = filtered.filter(product => {
        switch (this.stockFilter) {
          case 'in-stock': return product.stock > 10;
          case 'low-stock': return product.stock > 0 && product.stock <= 10;
          case 'out-of-stock': return product.stock === 0;
          default: return true;
        }
      });
    }

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
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
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
  

  categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Beverages', 'Snacks'];
  quantities = [10, 25, 50, 100, 200, 500];

  showSidePanel = false;
  editingProduct: Product | null = null;
  
  // Form data
  productForm = {
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
      category: product.category,
      price: product.price,
      quantity: product.quantity
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
      name: '',
      category: '',
      price: 0,
      quantity: 10
    };
  }
}
