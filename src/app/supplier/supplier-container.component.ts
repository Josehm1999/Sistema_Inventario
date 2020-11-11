import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { LoadData } from './state/actions/supplier-actions';
import { SwitchViewComponent } from '../shared/switch-view/switch-view.component';
import { Supplier } from './models/supplier';
import {
  getSupplierItems,
  getIsVisible,
} from './state/reducers/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplier-container',
  templateUrl: './supplier-container.component.html',
  styleUrls: ['./supplier-container.component.scss'],
})
export class SupplierContainerComponent implements OnInit, AfterViewInit {
  items$: Observable<Supplier[]> = this.store.select(getSupplierItems);
  isVisible$: Observable<boolean> = this.store.select(getIsVisible);
  @ViewChild('cardViewTemplate') private cardViewTemplate: TemplateRef<any>;
  @ViewChild('tableViewTemplate') private tableViewTemplate: TemplateRef<any>;
  templates: Map<string, TemplateRef<any>> = new Map<
    string,
    TemplateRef<any>
  >();
  defaultTemplate: string;
  searchControl: FormControl = new FormControl();
  constructor(private store: Store<any>, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.defaultTemplate = SwitchViewComponent.CARD_KEY;
    this.getSuppliers(1, 10);
    // filter(text => text.lenght >=3)
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => {
        this.getSuppliers(1, 10, val);
      });
  }

  ngAfterViewInit(): void {
    this.templates.set(SwitchViewComponent.CARD_KEY, this.cardViewTemplate);
    this.templates.set(SwitchViewComponent.TABLE_kEY, this.tableViewTemplate);
    this.ref.detectChanges();
  }

  getSuppliers(page: number, rows: number, searchTerm: string = ''): void {
    this.store.dispatch(new LoadData(page, rows, searchTerm));
  }
}
