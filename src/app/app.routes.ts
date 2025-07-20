import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component'; // Adjust the path as needed
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BillingComponent } from './billing/billing.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'billing', component: BillingComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'customers', component: CustomerComponent}
];
