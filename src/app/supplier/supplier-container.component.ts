import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { SwitchViewComponent } from '../shared/switch-view/switch-view.component';
import { Supplier } from './models/supplier';
import { SupplierService } from "./supplier.service";

@Component({
  selector: 'app-supplier-container',
  templateUrl: './supplier-container.component.html',
  styleUrls: ['./supplier-container.component.scss'],
  providers: [SupplierService]
})
export class SupplierContainerComponent implements OnInit, AfterViewInit {

  items: Supplier[] =[];
  @ViewChild("cardViewTemplate") private cardViewTemplate: TemplateRef<any>;
  @ViewChild("tableViewTemplate") private tableViewTemplate: TemplateRef<any>;
  templates: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
  defaultTemplate: string;
  searchControl: FormControl = new FormControl();
  isVisible=false;
  constructor(private service: SupplierService, private ref: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.defaultTemplate = SwitchViewComponent.CARD_KEY;
    this.getSuppliers(1,10);
    // filter(text => text.lenght >=3)
    this.searchControl.valueChanges
    .pipe(debounceTime(500),distinctUntilChanged())
    .subscribe(val => {
      this.getSuppliers(1,10,val)
    }); 
  } 

  ngAfterViewInit(): void {
    this.templates.set(SwitchViewComponent.CARD_KEY,this.cardViewTemplate);
    this.templates.set(SwitchViewComponent.TABLE_kEY,this.tableViewTemplate);
    this.ref.detectChanges();
  }

  getSuppliers(page: number, rows:number, searchTerm:string = ''): void{
    this.isVisible = true;
    this.service.getSupplierList(page,rows,searchTerm)
    .subscribe(response => {
      this.isVisible = false;
      this.items=response;
    })
  }
  

}
