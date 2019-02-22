import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() public count: number = 0;
  @Input() public page: number = 1;
  @Input() public size: number = 10;
  public pageCount: number = 1;
  @Output() public pageChange: EventEmitter<number> = new EventEmitter();
  public buttonStyle: any = {
    backgroundColor: 'transparent',
    border: '1px solid #d1d0d0',
    color: '#000',
    fontWeight: 'normal'
  };

  constructor() {/**/}

  /**
   * Angular hook on binding changes update page count
   * @param simpleChanges
   */
  public ngOnChanges(simpleChanges: SimpleChanges): void {
    this.pageCount = this.getPageCount();
  }

  /**
   * Increase page by one
   */
  public next(): void {
    if (this.page < this.pageCount) {
      this.page++;
      this.pageChange.next(this.page);
    }
  }

  /**
   * Decrease page by one
   */
  public previous(): void {
    if (this.page > 1) {
      this.page--;
      this.pageChange.next(this.page);
    }
  }

  /**
   * Set page to first page
   */
  public first(): void {
    this.page = 1;
    this.pageChange.next(this.page);
  }

  /**
   * Set page to the last page
   */
  public last(): void {
    this.page = this.pageCount;
    this.pageChange.next(this.page);
  }

  /**
   * Handles when a user types into the page input
   */
  public handlePageChange($event): void {
    if ($event.key === 'Enter' || $event.key === 'Return') {
      const page = parseInt($event.target.value, 10);
      if (isNaN(page)) {
        $event.target.value = this.page;
      } else if (page > this.pageCount) {
        $event.target.value = this.page;
      } else {
        this.page = page;
        this.pageChange.next(this.page);
      }
    }
  }

  /**
   * Returns the number for the last available page
   * @returns
   */
  private getPageCount(): number {
    let pages: number = this.count / this.size;
    const overflow = this.count % this.size;
    if (overflow) {
      pages++;
    }
    const pageCount = parseInt(pages.toString(), 10);
    if (pageCount === 0) {
      return 1;
    }
    return pageCount;
  }
}
