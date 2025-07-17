export class TableMetaData<T> {
  page = 0;
  pageSizeOptions = [20, 30, 40, 50];
  pageSize = this.pageSizeOptions[0];
  total = 0;
  keyword = '';
  filter: T = {} as T;

  constructor(init?: Partial<TableMetaData<T>>) {
    Object.assign(this, init);
  }
}
