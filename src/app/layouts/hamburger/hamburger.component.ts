import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent {
  @Input() init: boolean;
  @Output() opened = new EventEmitter<any>();

  active = false;
  showDropdown = false;

  constructor() {
    this.active = this.init || false;
  }

  onClick() {
    this.active = !this.active;
    this.opened.emit();
    this.showDropdown = !this.showDropdown;
  }
}
