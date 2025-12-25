import { Component, inject } from '@angular/core';
import { TableviewComponent } from "../tableview/tableview.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ToastrModule,ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category',
  imports: [CommonModule,FormsModule,ToastrModule,HttpClientModule, MatTableModule],
  templateUrl: './category.component.html',
  standalone: true,
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private toasterService : ToastrService,private http: HttpClient) { }

categoryName:string = '';
categoryDescription:string = '';
private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

ngOnInit(){
  this.getCategories();
}
addCategory() {
  if(this.validateCategory()){
    this.http.post('https://supermartspring.vercel.app/api/nexus_supermart/categories', {
      name: this.categoryName,
      description: this.categoryDescription
    }).subscribe((response) => {  
      console.log('Category added successfully', response);
      this.categoryName = '';
this.categoryDescription = '';
    }, (error) => {
      console.error('Error adding category', error);
    } 
    );
  }
}
validateCategory(){
  if(this.categoryName.trim() === '' || this.categoryDescription.trim() === '') {
    this.openSnackBar('Please fill all the fields', 'Close');
    return false;
  }

  this.categoryData = [...this.categoryData, { name: this.categoryName, description: this.categoryDescription }]; // New array reference

  return true;
}

  categoryData :any= [
   
  ];
  ColumnHeaders = ['Category Name', 'Action'];
  displayedColumns = ['name', 'action'];
   dataSource = new MatTableDataSource<any>([]);

  getCategories() {
    this.http.get<any>('https://supermartspring.vercel.app/api/nexus_supermart/categories?page=1&limit=100000')
      .subscribe((response) => {
        console.log('Categories fetched successfully', response);
        this.categoryData = response.data;
      }, (error) => {
        console.error('Error fetching categories', error);
      });
}
getStatusClass(status: string): string {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'status-active';
    case 'inactive':
      return 'status-inactive';
    default:
      return 'status-default';
  }
}
}
