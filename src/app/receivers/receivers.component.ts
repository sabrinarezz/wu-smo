import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceiversService } from '../services/receivers.service';

@Component({
  selector: 'app-receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent {

  receiverArray!: any;
  receiverId!: string;

  @Input() init: boolean;
  @Output() opened = new EventEmitter<any>();

  active = false;
  showDropdown = false;

  onClick() {
    this.active = !this.active;
    this.opened.emit();
    this.showDropdown = !this.showDropdown;
  }

  constructor( private rs: ReceiversService ) {
    this.active = this.init || false;
    this.rs.loadData().subscribe( val => {
      console.log(val);
      this.receiverArray = val;
    })
  }

  onDelete( id: any) {
    this.rs.DeleteData(id);
  }
}
