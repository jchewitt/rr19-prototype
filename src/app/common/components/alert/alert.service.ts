import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  private _alertContent: string = '';
  private _displayAlert: boolean = false;
  public get displayAlert(): boolean {
    return this._displayAlert;
  }
  public get alertContent(): string {
    return this._alertContent;
  }
  constructor() {
  }

  public closeAlert() {
    this._displayAlert = false;
  }

  public setAlert(content: string, timeout?: number) {
    console.log('alertSet');
    this._displayAlert = true;
    this._alertContent = content;
    if (timeout) {
      setTimeout(() => {
        this.closeAlert();
      }, timeout);
    }
  }
}
