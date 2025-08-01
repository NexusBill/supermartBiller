import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title = 'supermart';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  sortField: string = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';
  selectedSales: number[] = [];

  sales = [
    {
      id: 1001,
      customer: 'John Doe',
      customerEmail: 'john@example.com',
      customerAvatar: 'https://via.placeholder.com/40x40/007bff/ffffff?text=JD',
      product: 'Fresh Milk',
      category: 'dairy',
      productImage: 'https://via.placeholder.com/35x35/87CEEB/000000?text=M',
      quantity: 2,
      amount: 7.98,
      date: new Date('2024-01-15T10:30:00'),
      status: 'completed'
    },
    {
      id: 1002,
      customer: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerAvatar: 'https://via.placeholder.com/40x40/28a745/ffffff?text=JS',
      product: 'Organic Apples',
      category: 'fruits',
      productImage: 'https://via.placeholder.com/35x35/FFB6C1/000000?text=A',
      quantity: 1,
      amount: 5.99,
      date: new Date('2024-01-15T11:15:00'),
      status: 'pending'
    },
    {
      id: 1003,
      customer: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      customerAvatar: 'https://via.placeholder.com/40x40/dc3545/ffffff?text=BJ',
      product: 'Whole Grain Bread',
      category: 'bakery',
      productImage: 'https://via.placeholder.com/35x35/DEB887/000000?text=B',
      quantity: 3,
      amount: 8.97,
      date: new Date('2024-01-15T09:45:00'),
      status: 'processing'
    },
    {
      id: 1004,
      customer: 'Alice Brown',
      customerEmail: 'alice@example.com',
      customerAvatar: 'https://via.placeholder.com/40x40/ffc107/000000?text=AB',
      product: 'Premium Beef',
      category: 'meat',
      productImage: 'https://via.placeholder.com/35x35/CD853F/000000?text=B',
      quantity: 1,
      amount: 15.99,
      date: new Date('2024-01-15T14:20:00'),
      status: 'completed'
    },
    {
      id: 1005,
      customer: 'Charlie Wilson',
      customerEmail: 'charlie@example.com',
      customerAvatar: 'https://via.placeholder.com/40x40/6f42c1/ffffff?text=CW',
      product: 'Fresh Spinach',
      category: 'vegetables',
      productImage: 'https://via.placeholder.com/35x35/90EE90/000000?text=S',
      quantity: 2,
      amount: 4.98,
      date: new Date('2024-01-15T16:10:00'),
      status: 'cancelled'
    },
    // Add more sample data...
    {
      id: 1006,
      customer: 'Diana Davis',
      customerEmail: 'diana@example.com',
      customerAvatar: 'https://via.placeholder.com/40x40/e83e8c/ffffff?text=DD',
      product: 'Orange Juice',
      category: 'beverages',
      productImage: 'https://via.placeholder.com/35x35/FFA500/000000?text=J',
      quantity: 2,
      amount: 9.98,
      date: new Date('2024-01-15T12:30:00'),
      status: 'completed'
    }
  ];

  filteredSales = [...this.sales];
  paginatedSales: any[] = [];
  totalPages: number = 0;

  ngOnInit() {
    this.filterAndPaginate();
  }

  onSearch() {
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.filterAndPaginate();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'fa-sort';
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  filterAndPaginate() {
    // Filter
    this.filteredSales = this.sales.filter(sale => {
      const searchLower = this.searchTerm.toLowerCase();
      return (
        sale.customer.toLowerCase().includes(searchLower) ||
        sale.product.toLowerCase().includes(searchLower) ||
        sale.id.toString().includes(searchLower) ||
        sale.status.toLowerCase().includes(searchLower)
      );
    });

    // Sort
    this.filteredSales.sort((a, b) => {
      let aValue = a[this.sortField as keyof typeof a];
      let bValue = b[this.sortField as keyof typeof b];

      if (this.sortField === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Paginate
    this.totalPages = Math.ceil(this.filteredSales.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedSales = this.filteredSales.slice(start, end);
  }

  // Pagination methods
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterAndPaginate();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterAndPaginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterAndPaginate();
    }
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredSales.length);
  }

  // Status helpers
  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed': return 'fa-check-circle';
      case 'pending': return 'fa-clock';
      case 'processing': return 'fa-spinner';
      case 'cancelled': return 'fa-times-circle';
      default: return 'fa-question-circle';
    }
  }

  // Date formatting
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Action methods
  viewSale(sale: any) {
    console.log('View sale:', sale);
  }

  editSale(sale: any) {
    console.log('Edit sale:', sale);
  }

  deleteSale(sale: any) {
    console.log('Delete sale:', sale);
  }
}
