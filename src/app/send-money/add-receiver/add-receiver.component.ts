import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Receivers } from 'src/app/models/receivers.model';
import { ReceiversService } from 'src/app/services/receivers.service';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.scss']
})
export class AddReceiverComponent {
  selectedCountry!: any;
  showHideMn: boolean = true;

  receiverForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    country: new FormControl(''),
    countryCode: new FormControl(''),
    type: new FormControl(''),
    phoneNumber: new FormControl(''),
    bank: new FormControl(''),
    accNo: new FormControl(''),
    txn: new FormControl('')
  });

  receiverArray!: any;
  countryName: any = [
    {
      name: 'India',
      fn: true,
      mn: false,
      ln: true,
      bank: 'Bank of India(BOI)'
    },
    {
      name: 'USA',
      fn: true,
      mn: true,
      ln: true,
      bank: 'Bank Of America'
    },
    {
      name: 'Brazil',
      fn: true,
      mn: true,
      ln: true,
      bank: 'Banco do Brasil'
    },
    {
      name: 'Russia',
      fn: true,
      mn: false,
      ln: true,
      bank: 'Central Bank of Russian Federation'
    },
    {
      name: 'Pakistan',
      fn: true,
      mn: false,
      ln: true,
      bank: 'State Bank of Pakistan'
    },
    {
      name: 'Spain',
      fn: true,
      mn: true,
      ln: true,
      bank: 'Bank of Spain'
    },
    {
      name: 'France',
      fn: true,
      mn: false,
      ln: true,
      bank: 'Banque De France'
    }
];
  constructor ( private rs: ReceiversService, private router: Router ) {
    console.log('Form: ', this.receiverForm);
    this.rs.loadData().subscribe( val => {
      console.log(val);
      this.receiverArray = val;
    })
   }

  onSubmit( ) {
    let formData = this.receiverForm.value;

    let receiverData: Receivers = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      country: formData.country,
      countryCode: formData.countryCode,
      type: formData.type,
      phoneNumber: formData.phoneNumber,
      bank: formData.bank,
      accNo: formData.accNo,
      txn: formData.txn
    }

    this.rs.saveData(receiverData);

    // formData.reset();
    console.log("On Submit works!"); 
    this.router.navigate(['/review']);
  }
}
