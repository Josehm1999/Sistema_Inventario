import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EditCustomerService } from "./edit-customer.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



export interface DialogData{
  id: number;
}
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  providers: [EditCustomerService],
  styleUrls: ['./edit-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditCustomerComponent implements OnInit {

  newCustomerForm: FormGroup;
  customer: AddOrEditCustomer;

  constructor(private service: EditCustomerService, private fb: FormBuilder, 
              public dialogRef:MatDialogRef<EditCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
                this.customerRecuperado(data.id);
               }

  ngOnInit(): void {
    this.buildNewCustomerForm();
  }

  buildNewCustomerForm(): void{
    this.newCustomerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }

  customerRecuperado(id: number): void{
    this.service.getCustomerById(id)
    .subscribe(response =>{
      this.customer = response;
      this.newCustomerForm.patchValue({
        firstName: response.firstName,
        lastName: response.lastName,
        city: response.city,
        country: response.country,
        phone: response.phone
      });
    });
  }

  saveCustomer(): void{
    if(this.newCustomerForm.dirty && this.newCustomerForm.valid){
      const p = Object.assign({}, this.customer, this.newCustomerForm.value);
      p.id = this.data.id;
      this.service.editCustomer(p)
      .subscribe(response =>{
        this.dialogRef.close();
      });
    }else if(!this.newCustomerForm.dirty){
      this.newCustomerForm.reset();
    }
  }
  
}
