import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {

  selectPayMethod: number = 1;
  showPayOnline: boolean = true;
  showPayInCash: boolean = false;

  // countryId: any;
  // countryArray: any;

  countries: any[] = [];
  selectedCountry: any;
  selectedCurrency: any;

  sendAmount: number = 0;
  receiveAmount: number = 0;

  radioForm: FormGroup;

  sendMoneyForm: FormGroup = new FormGroup({
    country: new FormControl(''),
    sendAmount: new FormControl(''),
    receiverSide: new FormControl(''),
    senderSide: new FormControl('')
  });

  constructor ( private fb: FormBuilder, private cs: CountriesService, private ts: TransferService ) {
    // console.log(this.countryName.name);
    this.radioForm = this.fb.group({
      radio: [this.selectPayMethod]
    })

    // console.log('send-money-form: ', this.sendMoneyForm);
    
    // this.cs.loadData().subscribe( val => {
    //   // console.log(val);
    //   this.countryArray = val;
    //   console.log(val);
      
    // })
    this.cs.getCountry().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.countries.push(doc.data());
      })
    })
  }

  onCountrySelected() {
    this.ts.receiveAmount = this.receiveAmount;
    this.ts.selectedCountry = this.selectedCountry;
    this.ts.sendAmount = this.sendAmount;
    // console.log(this.selectedCountry);
    this.convertCurr('send');
  }

  convertCurr( type: string) {
    if ( type === 'send' ) {
      if ( this.selectedCountry && this.selectedCountry.usd && this.sendAmount ) {
        this.receiveAmount = this.sendAmount*this.selectedCountry.usd;
        console.log('Received: ', this.receiveAmount);
        
      } else {
        this.receiveAmount = 0;
      }
    } else if ( type === 'receive' ) {
      if ( this.selectedCountry && this.selectedCountry.usd && this.receiveAmount ) {
        this.sendAmount = this.receiveAmount/this.selectedCountry.usd;
        console.log('Sent: ', this.sendAmount);
        
      } else {
        this.sendAmount = 0;
      }
    }
  }

  onChange( event: any ) {
    if ( this.selectPayMethod === 1 ) {
      this.showPayOnline = true;
      this.showPayInCash = false;
    } else if ( this.selectPayMethod === 2 ) {
      this.showPayOnline = false;
      this.showPayInCash = true;
    }
  }
}
