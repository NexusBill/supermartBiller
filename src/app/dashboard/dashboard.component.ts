import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatAutocompleteModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [HttpClient, HttpClientModule],
})
export class DashboardComponent {
  title = 'supermart';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortField: string = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';
  selectedSales: number[] = [];
  sales: any[] = [];

  startDate!: Date | null;
  endDate!: Date | null;
  filteredSales = [...this.sales];
  paginatedSales: any[] = [];
  totalPages: number = 0;

  ngOnInit() {
    this.filterAndPaginate();
    this.fetchCustomers();
  }

  onSearch() {
    this.currentPage = 1;
    this.filterAndPaginate();
  }
  onCustomerChange() {
    this.filteredSales = [...this.sales];
    if(!this.selectedCustomer || this.selectedCustomer === '') {

      this.paginatedSales = this.filteredSales.slice(0, this.itemsPerPage);
      this.totalPages = Math.ceil(this.filteredSales.length / this.itemsPerPage); 
      return;
    }
    this.filteredSales = this.filteredSales.filter(sale => {
      return sale.customer.toLowerCase().includes(this.selectedCustomer.toLowerCase());
    });
    this.paginatedSales = this.filteredSales;
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  onDateChange() {
    debugger;
    if (this.startDate && this.endDate) {
      debugger;
      const start = this.formatDate(this.startDate);
      const end = this.formatDate(this.endDate);

      this.fetchOrdersBetweenDates(start, end);
    }
  }
  fetchOrdersBetweenDates(start: string, end: string) {
    this.http.get(`https://supermartspring.vercel.app/api/orders/date-range?start=${start}&end=${end}`).subscribe((res: any) => {
      this.sales = res.map((item: any) => ({

        id: item.invoice,
        customer: item.customer,
        product: item.products,
        date: new Date(item.date),
        status: item.status,
        paymentMethod: item.paymentMethod,
        paymentStatus: item.paymentStatus,
        amount: item.amount,
        discount: item.discount,
        savings: item.savings,
        createdAt: new Date(item.createdAt)
      }));
      this.filterAndPaginate();
    });
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
  fetchCustomers(){
    this.http.get('https://supermartspring.vercel.app/customers').subscribe((res: any) => {
      this.customers = res;
      console.log(this.customers);
    });
  }
  // // Date formatting
  // formatDate(date: Date): string {
  //   return new Intl.DateTimeFormat('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric'
  //   }).format(date);
  // }

  // formatTime(date: Date): string {
  //   return new Intl.DateTimeFormat('en-US', {
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   }).format(date);
  // }

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

  orderURL: string = "https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/edit?gid=901963204#gid=901963204"

  constructor(private http: HttpClient) {
    this.fetchFromExcel();

  }

  customers: any[] = [];
  selectedCustomer: string = '';
  fetchFromExcel() {
    debugger;
    this.http.get('https://supermartspring.vercel.app/api/orders').subscribe((res: any) => {
      debugger
      this.sales = res.map((item: any) => ({

        id: item.invoice,
        customer: item.customer,

        product: item.products,

        date: new Date(item.date),
        status: item.status,
        paymentMethod: item.paymentMethod,
        paymentStatus: item.paymentStatus,
        amount: item.amount,
        discount: item.discount,
        savings: item.savings,
        createdAt: new Date(item.createdAt)
      }));

this.filteredSales = [...this.sales];
      this.monthlySalesAmount = this.sales.reduce((acc, sale) => acc + sale.amount, 0);

      // If you have a different field for profit, replace 'savings' with that field
      this.monthlyProfitAmount = this.sales.reduce((acc, sale) => acc + (sale.savings), 0);
      this.filterAndPaginate();

    });
  }
  monthlySalesAmount: number = 0;
  monthlyProfitAmount: number = 0;
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 01-12
    const day = String(date.getDate()).padStart(2, '0'); // 01-31
    return `${year}-${month}-${day}`;
  }




}
