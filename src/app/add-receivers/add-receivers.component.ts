import { Component } from '@angular/core';
// import { Country } from '../models/country.model';
import { Receivers } from '../models/receivers.model';
import { ReceiversService } from '../services/receivers.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-receivers',
  templateUrl: './add-receivers.component.html',
  styleUrls: ['./add-receivers.component.scss']
})
export class AddReceiversComponent {

  selectedCountry!: any;
  showHideMn: boolean = true;

  receiverForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    country: new FormControl(''),
    countryCode: new FormControl(''),
    type: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  receiverArray!: any;
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
  constructor ( private rs: ReceiversService, private router: Router ) {
    console.log('Form: ', this.receiverForm);
    this.rs.loadData().subscribe( val => {
      console.log(val);
      this.receiverArray = val;
    })
   }

  onOptionSelected(value: string) {
    // console.log(value);
    //let selCont: any[];
    this.countryName.forEach((selCont: any) => {
      if(selCont.name === value)
      {
        this.showHideMn = selCont.mn;
      }
    });
    console.log(this.showHideMn);  
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
      phoneNumber: formData.phoneNumber
    }

    this.rs.saveData(receiverData);

    // formData.reset();
    console.log("On Submit works!"); 
    this.router.navigate(['/receivers']);
  }
}
