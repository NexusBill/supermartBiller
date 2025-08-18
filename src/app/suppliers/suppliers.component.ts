import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TableviewComponent } from "../tableview/tableview.component";

@Component({
  selector: 'app-suppliers',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule, TableviewComponent],
  templateUrl: './suppliers.component.html',
  providers: [HttpClient, HttpClientModule],
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  @Input() initialData: any = null; // for edit
  @Output() save = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  supplierForm!: FormGroup;
  constructor(private fb: FormBuilder,private http : HttpClient) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      name: [this.initialData?.name || '', Validators.required],
      contactPerson: [this.initialData?.contactPerson || ''],
      phone: [this.initialData?.phone || '', [Validators.required, Validators.pattern('^\\+?[0-9\- ]{7,15}$')]],
      email: [this.initialData?.email || '', Validators.email],
      gstin: [this.initialData?.gstin || ''],
      address: [this.initialData?.address || ''],
      state: [this.initialData?.state || ''],
      city: [this.initialData?.city || ''],
      pincode: [this.initialData?.pincode || ''],
      paymentTerms: [this.initialData?.paymentTerms || ''],
      items: [this.initialData?.items || ''],
      active: [this.initialData?.active ?? true]
    });
  }

  get f() { return this.supplierForm.controls; }

  onSubmit(){
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    // transform items string -> array if needed
    const value = { ...this.supplierForm.value };
    if (typeof value.items === 'string') value.items = value.items.split(',').map((s:any) => s.trim()).filter(Boolean);

    // emit or call service to save
    this.save.emit(value);
  }
  ngOninit() {
    this.getSupplierData();
  }

  onCancel(){
    this.cancelled.emit();
  }
  ColumnHeaders = ['Name', 'Contact Person', 'Phone', 'Email','Address', 'State', 'City', 'Pincode', 'Payment Terms', 'Items', 'Active', 'Actions'];
  displayedColumns = ['name', 'contactPerson', 'phone', 'email',  'address', 'state', 'city', 'pincode', 'paymentTerms', 'items', 'active', 'actions'];
suppliers: any[] = [];
  getSupplierData() {
    this.http.get('https://supermartspring.vercel.app/suppliers').subscribe((response: any) => {
      console.log('Suppliers fetched successfully', response);
      this.suppliers = response;
    }, (error) => {
      console.error('Error fetching suppliers', error);
    });
  }
  editSupplier(supplier: any) {
    this.supplierForm.patchValue(supplier);
    this.initialData = supplier; // set initial data for edit
    this.http.put(`https://supermartspring.vercel.app/suppliers/${supplier.id}`, this.supplierForm.value).subscribe((response) => {
      console.log('Supplier updated successfully', response);
      this.getSupplierData(); // Refresh the list after update
    }, (error) => {
      console.error('Error updating supplier', error);
    });
  } 
  deleteSupplier(supplierId: string) {
    this.http.delete(`https://supermartspring.vercel.app/suppliers/${supplierId}`).subscribe((response) => {
      console.log('Supplier deleted successfully', response);
      this.getSupplierData(); // Refresh the list after deletion
    }, (error) => {
      console.error('Error deleting supplier', error);
    });
  }
}
