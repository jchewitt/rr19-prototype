import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../../common/services/records.service';
import { Record } from '../../common/models/record.model';
import * as moment from 'moment';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  page: number = 1;
  records: Array<Record> = [];
  currentRecords: Array<Record> = [];
  rows: Array<string> = ['title', 'division', 'projectOwner', 'budget', 'status', 'created', 'modified'];
  pageCount: number = 5;
  filters: any = {
    title: '',
    division: '',
    projectOwner: '',
    budget: '',
    status: '',
    created: null,
    modified: null
  };

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.recordsService.loadRecords().subscribe(res => {
      this.records = res;
      this.setCurrentRecords(this.page);
    });
  }

  pageChanged(page: number) {
    this.setCurrentRecords(page);
  }

  applyFilters() {
    this.setCurrentRecords(1);
  }

  updateRecord($event, rowIdx: number, colIdx: number) {
    const record = this.currentRecords[rowIdx];
    const updateRecord = this.records.find(data => data.title === record.title);
    updateRecord[this.rows[colIdx]] = $event;
  }

  private setCurrentRecords(page: number) {
    const filteredRecords = this.getFilteredRecords();
    this.currentRecords = filteredRecords.splice(page - 1, this.pageCount);
  }

  private getFilteredRecords() {
    let noFilters = true;
    Object.keys(this.filters).forEach(key => {
      if (key === 'created' && this.filters.created && this.filters.created.startDate && this.filters.created.endDate) {
        noFilters = false;
      }
      if (key === 'modified' && this.filters.modified && this.filters.modified.startDate && this.filters.modified.endDate) {
        noFilters = false;
      }
      if (key !== 'modified' && key !== 'created' && this.filters[key]) {
        noFilters = false;
      }
    });
    if (noFilters) {
      return [...this.records];
    } else {
      let filteredValues = [...this.records];
      if (this.filters.title) {
        filteredValues = filteredValues.filter(
          record => record.title.toLowerCase().startsWith(this.filters.title.toLowerCase())
        );
      }
      if (this.filters.division) {
        filteredValues = filteredValues.filter(
          record => record.division.toLowerCase().startsWith(this.filters.division.toLowerCase())
        );
      }
      if (this.filters.projectOwner) {
        filteredValues = filteredValues.filter(
          record => record.projectOwner.toLowerCase().startsWith(this.filters.projectOwner.toLowerCase())
        );
      }
      if (this.filters.status) {
        filteredValues = filteredValues.filter(
          record => record.status.toLowerCase().startsWith(this.filters.status.toLowerCase())
        );
      }
      if (this.filters.budget) {
        filteredValues = filteredValues.filter(
          record => record.budget.toString().startsWith(this.filters.budget.toString())
        );
      }
      if (this.filters.created && this.filters.created.startDate && this.filters.created.endDate) {
        filteredValues = filteredValues.filter(
          record => record.created >= this.filters.created.startDate.date() && record.created <= this.filters.created.endDate.date()
        );
      }
      if (this.filters.modified && this.filters.modified.startDate && this.filters.modified.endDate) {
        filteredValues = filteredValues.filter(
          record => record.modified >= this.filters.modified.startDate.date() && record.modified <= this.filters.modified.endDate.date()
        );
      }
      return filteredValues;
    }
  }

  gotoDetails($event) {
    $event.preventDefault();
  }

  getAverageBudget(): number {
    const budgetArr = this.getFilteredRecords().map(record => record.budget);
    return budgetArr.reduce((sum, cur) => {return sum += cur;}, 0) / budgetArr.length;
  }

  getCount(status: string): number {
    return this.getFilteredRecords().filter(record => record.status === status).length;
  }

  clearFilters() {
    this.filters.budget = null;
    this.filters.created = null;
    this.filters.modified = null;
    this.filters.division = null;
    this.filters.projectOwner = null;
    this.filters.status = null;
    this.filters.title = null;
    this.setCurrentRecords(1);
  }

}
