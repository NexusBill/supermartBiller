import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component'; // Adjust the path as needed
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingComponent } from './billing/billing.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';

export const routes: Routes = [
    {path: '', component: CustomerOrderComponent},
  { path: 'products', component: CustomerOrderComponent },
  { path: 'billing', component: CustomerOrderComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'customers', component: CustomerComponent}
];
