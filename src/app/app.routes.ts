import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component'; // Adjust the path as needed
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingComponent } from './billing/billing.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'billing', component: BillingComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'orders', component: SuppliersComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'customers', component: CustomerComponent}
];
