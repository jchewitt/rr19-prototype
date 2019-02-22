import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTable implements OnChanges, OnInit {
  @Input() public items;
  @Input() public sortable: boolean = false;
  @Input() public columns: Array<string> = [];
  @Input() public rows: Array<string> = [];
  @Input() public rowTemplate: TemplateRef<any>;
  public values: Array<any> = [];
  public doneSorting: boolean = true;
  public sortIdx: number = 0;
  public sortDirection: string;

  constructor() {

  }

  public ngOnInit() {
    this.sortOn(0);
  }
  public ngOnChanges(changes: SimpleChanges): void {
    const value = changes.items.currentValue;
    if (value) {
      this.values = [...this.items];
    }
  }

  public sortOn(idx: number): void {
    if (!this.sortable) {
      return;
    }
    this.sortIdx = idx;
    const field: string = this.rows[idx];
    if (!this.sortDirection || this.sortDirection === 'down') {
      this.sortDirection = 'up';
    } else {
      this.sortDirection = 'down';
    }
    this.values = this.values.sort((a: any, b: any) => {
      let f = a;
      let s = b;
      if (this.sortDirection === 'up') {
        f = b;
        s = a;
      }
      return f[field] === s[field] ? 0 : f[field] > s[field] ? 1 : -1;
    });
    this.values = [...this.values];
  }
}
