import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleItem } from './toggle-item.model';

export const TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true
};

@Component({
  selector: 'app-toggle',
  providers: [TOGGLE_VALUE_ACCESSOR],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements ControlValueAccessor {
  private _currentToggle: ToggleItem;
  @Input() public toggleItems: Array<ToggleItem> = [];
  @Output() public valueChanged: EventEmitter<string> = new EventEmitter();
  public onChange = (val) => {/**/};
  public onTouched = () => {/**/};
  public get currentToggle(): ToggleItem {
    return this._currentToggle;
  }
  public set currentToggle(toggleItem: ToggleItem) {
    this._currentToggle = toggleItem;
  }

  constructor() {

  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(val) {
    this.currentToggle = null;
    this.toggleItems.forEach(toggleItem => {
      if (toggleItem.value === val) this.currentToggle = toggleItem;
    });
  }

  setToggle(val: ToggleItem) {
    this.currentToggle = val;
    this.onChange(val.value);
  }
}
