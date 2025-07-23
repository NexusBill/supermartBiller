import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';   // <-- REQUIRED
import { FormsModule } from '@angular/forms';     // <-- REQUIRED
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-tableview',
  imports: [
    MatTableModule,      // For <table mat-table>
    MatPaginatorModule,  // For <mat-paginator>
    MatSortModule,
    CommonModule,       // For ngIf, ngFor, etc.
    FormsModule          // For ngModel, etc.

  ],
  templateUrl: './tableview.component.html',
  styleUrl: './tableview.component.css'
})
export class TableviewComponent {
   @Input() displayedColumns: any;  // Column keys
   @Input() columnHeaders: any;     // Column headers
  @Input() tableData:any;              // Table data
  @Output() rowClick = new EventEmitter<any>(); // Event when row is clicked

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.data = this.tableData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  peopleData = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Alice', age: 25, city: 'London' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
    { name: 'Bob', age: 35, city: 'Paris' },
  ];
 //displayedColumns: string[] = ['name', 'age', 'city'];
//columnHeaders: string[] = ['Name', 'Age', 'City'];
ngOnInit() {
  this.dataSource.data = this.tableData;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
 

}

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  // When input data changes, update the table
  ngOnChanges() {
    debugger
    this.dataSource.data = this.tableData;
  }
}
