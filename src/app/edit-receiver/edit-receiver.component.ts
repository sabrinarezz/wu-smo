import { Component } from '@angular/core';
import { ReceiversService } from '../services/receivers.service';
import { Receivers } from '../models/receivers.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-receiver',
  templateUrl: './edit-receiver.component.html',
  styleUrls: ['./edit-receiver.component.scss']
})
export class EditReceiverComponent {

  receiverArray!: any;
  formReceiver!: Receivers;
  receiverId!: any;

  receiverForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    country: new FormControl(''),
    countryCode: new FormControl(''),
    type: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  countryName: any = [
    {
      name: 'India',
      fn: true,
      mn: false,
      ln: true
    },
    {
      name: 'USA',
      fn: true,
      mn: true,
      ln: true
    },
    {
      name: 'Brazil',
      fn: true,
      mn: true,
      ln: true
    },
    {
      name: 'Russia',
      fn: true,
      mn: false,
      ln: true
    },
    {
      name: 'Pakistan',
      fn: true,
      mn: false,
      ln: true
    },
    {
      name: 'Spain',
      fn: true,
      mn: true,
      ln: true
    },
    {
      name: 'France',
      fn: true,
      mn: false,
      ln: true
    }
  ];

  constructor( private rs: ReceiversService, private route: ActivatedRoute, private router: Router ) {
    this.route.paramMap.subscribe( params => {
      // console.log(params);
      this.receiverId = params.get('rid');
      // console.log(this.receiverId);
      this.rs.loadReceiver(this.receiverId).subscribe( val => {
        // console.log(val);
        this.receiverArray = val;
        console.log('Edit: ', this.receiverArray)
      })
    })
  }

  onSubmit() {
    let formData = this.receiverForm.value;
    console.log("formData: ", formData);
    console.log("rid: ", this.receiverId);

    let receiverData: Receivers = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      country: formData.country,
      countryCode: formData.countryCode,
      type: formData.type,
      phoneNumber: formData.phoneNumber
    }
    
    this.rs.updateData(this.receiverId, receiverData);
    console.log("receiverId:", this.receiverId);
    this.router.navigate(['/receivers']);
    // formData.reset();
  }
}
