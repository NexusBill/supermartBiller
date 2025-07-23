import { Component, inject } from '@angular/core';
import { TableviewComponent } from "../tableview/tableview.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { ToastrModule,ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  imports: [TableviewComponent,CommonModule,FormsModule,ToastrModule,],
  templateUrl: './category.component.html',
  standalone: true,
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private toasterService : ToastrService) { }

categoryName:string = '';
categoryDescription:string = '';
private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


validateCategory(){
  if(this.categoryName.trim() === '' || this.categoryDescription.trim() === '') {
    this.openSnackBar('Please fill all the fields', 'Close');
    return false;
  }
  this.openSnackBar('Category Added', 'Done');

  this.categoryData = [...this.categoryData, { name: this.categoryName, description: this.categoryDescription }]; // New array reference
this.categoryName = '';
this.categoryDescription = '';
  return true;
}

  categoryData = [
    { name: 'Stationary', description: 'Devices and gadgets' },  
    { name: 'Electronics', description: 'Electronic items' },
    { name: 'Groceries', description: 'Daily needs' },
    { name: 'Clothing', description: 'Apparel and accessories' },
    { name: 'Furniture', description: 'Home and office furniture' }
  ];
  ColumnHeaders = ['Category Name', 'Description'];
  displayedColumns = ['name', 'description'];

}
