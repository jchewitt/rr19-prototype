import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() maxWidth = false;
  @Input() buttonStyle: any = {};
  @Input() styleType = '';
  @Input() disabled: boolean = false;
  constructor() { }

  @HostBinding('style.opacity')
  get isDisabled() {
    return this.disabled ? 0.5 : 1;
  }

  ngOnInit() {}

}
