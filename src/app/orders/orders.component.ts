import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckbox } from "@angular/material/checkbox";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-orders',
  imports: [MatTableModule,HttpClientModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,CommonModule, FormsModule, MatCheckbox],
  templateUrl: './orders.component.html',
  standalone:true,
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(private httpClient: HttpClient) { }
displayedColumns: string[] = ['orderId', 'customerName', 'orderDate', 'status', 'totalAmount', 'action'];
openSidebar: boolean = false;
  ngOnInit() {
    this.getOrders();
  }
 
  selectedStatus: any;
  selectedOrderId: number | null = null;
  selectedOrder:any;
  openCommentSidebar(orderId: number) {
    this.selectedOrderId = orderId;
    this.openSidebar = true;
  }
  closeSidebar() {
  this.openSidebar = false;
}

onRejectOrder() {
    // Logic to reject the order
    this.selectedOrder.status = 'cancelled';
     this.httpClient.put(`https://supermartspring.vercel.app/api/nexus_supermart/orders/status-update/${this.selectedOrder?.orderId}`, this.selectedOrder).subscribe((data:any) => {
      console.log('Order updated successfully:', data);
      this.closeSidebar();
    });
  }

  orderComment: string = '';
  addComment(orderId: number) {
    // Logic to add comment to the order
    console.log(`Comment added to order ${orderId}: ${this.orderComment}`);
    this.orderComment = ''; // Clear the comment input

  }
 
selection = new SelectionModel<any>(true, []); // true = multi select
selectedProducts: any[] = [];
pagedProducts: any[] = [];
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
  
  statusList = [
    'pending',
    'processing',
    'out for delivery',
    'cancelled'
  ];
      widgetWidth: number=0;

products: any[] = [
    { name: 'Product 1', quantity: 2 },
    { name: 'Product 2', quantity: 1 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
    { name: 'Product 3', quantity: 5 },
  ];
      openEditPanel(order: any) {
        debugger
        this.selectedOrder = order;
        this.openSidebar = true;
      }
 @ViewChild(MatPaginator) paginator!: MatPaginator;
   dataSource = new MatTableDataSource<any>([]);

 ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(value: string) {
  this.dataSource.filter = value.trim().toLowerCase();
}
  
  getOrders() {
    return this.httpClient.get('https://supermartspring.vercel.app/api/nexus_supermart/orders').subscribe((data:any) => {
      this.dataSource.data = data.data;
    });
  }
  updateOrderStatus(){
    this.httpClient.put(`https://supermartspring.vercel.app/api/nexus_supermart/orders/status-update/${this.selectedOrder?.orderId}`, this.selectedOrder).subscribe((data:any) => {
      console.log('Order updated successfully:', data);
      this.closeSidebar();
    });
  }
}
