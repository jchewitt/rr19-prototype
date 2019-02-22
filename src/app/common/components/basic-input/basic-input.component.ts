import { Component, EventEmitter, forwardRef, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BasicInputComponent),
  multi: true
};

@Component({
  selector: 'app-basic-input',
  providers: [TEXTAREA_VALUE_ACCESSOR],
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss']
})
export class BasicInputComponent implements ControlValueAccessor {
  @ViewChild('textarea') textarea;
  public state: string = 'inactive'
  public editable: boolean = false;
  public onChange: any = () => {/**/};
  public onTouched: any = () => {/**/};
  @Input() large: boolean = false;
  @Input() disabled: boolean = false;
  @Input() viewOnly: boolean = false;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  private cachedValue: string = '';
  constructor(private renderer: Renderer2) {}

  public writeValue( value: any): void {
    const div = this.textarea.nativeElement;
    this.renderer.setProperty(div, 'textContent', value);
  }

  public cancel() {
      this.renderer.setProperty(this.textarea.nativeElement, 'textContent', this.cachedValue);
      this.onCancel.emit(true);
    this.editable = false;
    this.state = 'inactive';

  }

  public save() {
    this.onSave.emit(this.textarea.nativeElement.textContent);
    this.editable = false;
    this.state = 'inactive';
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public change($event) {
    this.onChange($event.target.textContent);
  }

  public editInput(): void {
    if (this.viewOnly) {
      return;
    }
    this.cachedValue = this.textarea.nativeElement.textContent;
    this.onEdit.emit(true);
    if (!this.viewOnly) {
      this.editable = true;
      this.state = 'active';
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    const div = this.textarea.nativeElement;
    const action = isDisabled? 'addClass': 'removeClass';
    this.renderer[action](div, 'disabled');
  }

  registerOnTouched(fn: any) : void {
    this.onTouched = fn;
  }
}
