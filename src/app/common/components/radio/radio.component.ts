import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};


@Component({
  selector: 'app-radio',
  providers: [RADIO_VALUE_ACCESSOR],
  templateUrl: './radio.component.html',
  styles: [`

  `]
})
export class RadioComponent implements ControlValueAccessor {
  private _toggle: boolean = false;
  @Input() btnLabelOn: string = 'On';
  @Input() btnLabelOff: string = 'Off';
  public get toggle(): boolean {
    return this._toggle;
  }
  public set toggle(val) {
    this._toggle = val;
  }
  public onChange = (val) => {/**/};
  public onTouched = () => {/**/};
  @Output() valueChanged: EventEmitter<boolean> = new EventEmitter();
  constructor() {

  }

  writeValue(val: boolean): void {
    this.toggle = val;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }


  doToggle() {
    this.toggle = !this.toggle;
    this.onChange(this.toggle);
  }
}
