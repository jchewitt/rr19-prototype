import { Injectable } from '@angular/core';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Record, RecordInterface } from '../models/record.model';

@Injectable()
export class RecordsService {
  cachedRecords: Array<Record>;
  constructor(private http: HttpClient) {
  }

  /**
   * Loads all records data
   */
  public loadRecords(): Observable<Record[]> {
    // TODO: move to ngrx/store for better state management
    // TODO: implement any server side search parameters
    // TODO: Add angular-in-memory-api or setup some other mock mechanism to decouple hard coded
    // TODO: data urls and move mock data to separate location.
    if (this.cachedRecords) {
      return of(this.cachedRecords);
    }
    return this.http.get('/data.json').pipe(map((data: RecordInterface[]) => {
      this.cachedRecords = data.map(record => new Record(record));
      return this.cachedRecords;
    }));
  }
}
