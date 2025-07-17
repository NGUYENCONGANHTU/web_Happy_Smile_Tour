import { TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ColumnConfig {
  key: string;
  title: string;
  type?: ColumnType;
  width?: string;
  template?: TemplateRef<any>;
  dateFormatIn?: string;
  dateFormatOut?: string;
  filter?: TableFilterConfig;
}

export interface TableFilterConfig {
  type: TableFilterType;
  options?: any[];
  onChange?: (value: any) => void;
  optionObserve?: (value: string) => Observable<any>;
}

export interface TableFilter extends TableFilterConfig {
  visible: boolean;
  active: boolean;
  value: any;
  loading?: boolean;
  searchChangeSubject$?: BehaviorSubject<string>;
  searchChange$?: any;
}

export interface ITableMetaData {
  page: number;
  pageSize: number;
  total: number;
}

export enum ColumnType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  TEMPLATE_REF = 'TEMPLATE_REF',
}

export enum TableFilterType {
  SELECTION = 'SELECTION',
  SEARCH = 'SEARCH',
  NUMBER_RANGE = 'NUMBER_RANGE',
  DATE_RANGE = 'DATE_RANGE',
  CUSTOM_TEMPLATE = 'CUSTOM_TEMPLATE',
}
