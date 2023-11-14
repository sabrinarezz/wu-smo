import { Component } from '@angular/core';
import { ReceiversService } from '../services/receivers.service';

@Component({
  selector: 'app-receivers',
  templateUrl: './receivers.component.html',
  styleUrls: ['./receivers.component.scss']
})
export class ReceiversComponent {

  receiverArray!: any;
  receiverId!: string;

  constructor( private rs: ReceiversService ) {
    this.rs.loadData().subscribe( val => {
      console.log(val);
      this.receiverArray = val;
    })
  }

  onDelete( id: any) {
    this.rs.DeleteData(id);
  }
}
