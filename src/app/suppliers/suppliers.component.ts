import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  imports: [FormsModule,ReactiveFormsModule,CommonModule ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  @Input() initialData: any = null; // for edit
  @Output() save = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  supplierForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

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

  onCancel(){
    this.cancelled.emit();
  }
}
