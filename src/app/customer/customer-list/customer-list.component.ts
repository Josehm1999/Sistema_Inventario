import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import {MatDialog} from '@angular/material/dialog';
import { NewCustomerComponent } from '../new-customer/new-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { Store } from '@ngrx/store';
import { LoadData } from '../state/actions/customer-actions';
import { Observable } from 'rxjs';
import { getCustomerItems, getIsLoading, getNumberOfRecords } from '../state/reducers/index';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit {

  customers$: Observable<Customer[]> = this.store.select(getCustomerItems);
  isLoading$: Observable<boolean> = this.store.select(getIsLoading); 
  numberOfRecords$: Observable<number> = this.store.select(getNumberOfRecords);
  pageSizeOptions: Number[] = [9,21,42];
  pageSize = 10;
  pageIndex = 0;
  
  constructor(public dialog: MatDialog, private store: Store<any>) { 
    // this.getCustomer(1,this.pageSize);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadData(1, this.pageSize));
  }

  getCustomer(page: number, rows: number): void{
    this.store.dispatch(new LoadData(page, rows));
  }

  changePage(event: any):void {
    this.getCustomer(event.pageIndex + 1, event.pageSize)
  }

  newCustomer(): void{
    const dialogRef = this.dialog.open(NewCustomerComponent, {
      panelClass: "new-customer-modal-dialog" 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomer(1,10);
    });
  }

  editCustomer(id: number): void{
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      panelClass: "new-customer-modal-dialog",
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomer(1,10);
    });
  }

  viewDetails(id: number): void{
    const dialogRef = this.dialog.open(CustomerDetailsComponent, {
      panelClass: "new-customer-modal-dialog",
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomer(1,10);
    });
  }
}
