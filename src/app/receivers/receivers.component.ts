import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceiversService } from '../services/receivers.service';
import { Receivers } from '../models/receivers.model';

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
  showDetails: boolean = false;

  constructor( private rs: ReceiversService ) {
    // console.log('receivers: ', this.receiverArray);
    
    this.active = this.init || false;
    this.rs.loadData().subscribe( val => {
      console.log(val);
      this.receiverArray = val;
    })
  }
  
  onClick() {
    this.active = !this.active;
    this.opened.emit();
    this.showDropdown = !this.showDropdown;
  }

  showReceiverDetails(id: any) {
    this.showDetails = !this.showDetails;
  }

  onDelete( id: any) {
    this.rs.DeleteData(id);
  }
}
