import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgTemplateOutlet } from '@angular/common';
import {
  ColumnConfig,
  ColumnType,
  TableFilter,
  TableFilterType,
} from '../../interfaces/table-base.interface';
import { DateTimeFormatPipe } from '../../pipes/date-time-format.pipe';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { ConsiderNotNullPipe } from '../../pipes/consider-not-null.pipe';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-table-base-component',
  templateUrl: 'table-base.component.html',
  standalone: true,
  imports: [
    NzTableModule,
    NgTemplateOutlet,
    DateTimeFormatPipe,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    ConsiderNotNullPipe,
    NzDatePickerModule,
  ],
})
export class TableBaseComponent implements OnChanges {
  @Input({ required: true }) columns: ColumnConfig[] = [];
  @Input({ required: true }) data: Record<string, any>[] = [];
  @Input({ required: true }) page = 0;
  @Input({ required: true }) pageSize = 0;
  @Input({ required: true }) total = 0;
  @Input() loading = false;
  @Output() pageChange = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter();
  @Output() filterChange = new EventEmitter<{
    columnKey: string;
    value: any;
    filter: Record<string, TableFilter>;
    data?: Record<string, any>;
  }>();

  filter: Record<string, TableFilter> = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.filter = {};
      this.columns.forEach(col => {
        if (col?.filter) {
          this.filter[col.key] = {
            value: null,
            visible: false,
            active: false,
            loading: false,
            searchChangeSubject$: new BehaviorSubject(''),
            onChange: col.filter.onChange,
            options: col.filter.options ?? [],
            type: col.filter.type,
          };
          if (
            col.filter.type === TableFilterType.SELECTION &&
            col.filter.optionObserve
          ) {
            this.filter[col.key] = {
              ...this.filter[col.key],
              searchChange$: this.filter[col.key].searchChangeSubject$
                ?.asObservable()
                .pipe(debounceTime(500))
                .pipe(switchMap(col.filter.optionObserve))
                .subscribe(res => {
                  this.filter[col.key].options = [...res];
                  this.filter[col.key].loading = false;
                  this.filter = { ...this.filter };
                }),
            };
          }
        }
      });
    }
  }

  handleFilterChange(colKey: string, value: any) {
    this.filterChange.emit({
      columnKey: colKey,
      value: value,
      filter: this.filter,
    });
  }

  handleFilterSearch(col: ColumnConfig, event: string) {
    if (col.filter?.optionObserve) {
      this.filter[col.key].loading = true;
      this.filter[col.key].searchChangeSubject$?.next(event);
    }
  }

  get _page() {
    return this.page + 1;
  }

  set _page(value: number) {
    this.page = value - 1;
  }

  protected readonly ColumnType = ColumnType;
  protected readonly TableFilterType = TableFilterType;
}
