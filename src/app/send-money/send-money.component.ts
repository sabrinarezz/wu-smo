import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { Receivers } from '../models/receivers.model';
import { ReceiversService } from '../services/receivers.service';
import { Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent {
  selectPayMethod: number;
  showPayOnline: boolean;
  showPayInCash: boolean;

  // countryId: any;
  // countryArray: any;

  countries: any[] = [];
  selectedCountry: any;
  selectedCurrency: any;

  sendAmount: number = 0;
  receivedAmount: number = 0;

  sendMoneyForm: FormGroup = new FormGroup({
    country: new FormControl(''),
    sendAmount: new FormControl(''),
    receivedAmount: new FormControl(''),
    payMethod: new FormControl(''),
    payIn: new FormControl(''),
    payOut: new FormControl('')
  });

  payIn = [
    {
      id: 'myCheckbox1',
      name: 'Cash Pick Up',
      img: './../../assets/cash-coin.svg',
      value: 'Cash Pick Up'
    }, 
    {
      id: 'myCheckbox2',
      name: 'Bank account',
      img: './../../assets/bank.svg',
      value: 'Bank Account'
    },
    {
      id: 'myCheckbox3',
      name: 'Mobile Wallet',
      img: './../../assets/wallet2.svg',
      value: 'Mobile Wallet'
    },
    {
      id: 'myCheckbox4',
      name: 'Debit Card',
      img: './../../assets/visa.png',
      value: 'Debit Card'
    },
  ];

  payOut = [
    {
      id: 'myCheckbox5',
      name: 'Credit Card',
      img: './../../assets/credit-card-2-front.svg',
      fee: 15.00,
      value: 'Credit Card'
    },
    {
      id: 'myCheckbox6',
      name: 'Debit Card',
      img: './../../assets/credit-card-2-front.svg',
      fee: 0.00,
      value: 'Debit Card'
    },
    {
      id: 'myCheckbox7',
      name: 'Bank Account',
      img: './../../assets/bank.svg',
      fee: 0.00,
      value: 'Bank Account'
    },
  ];

  constructor ( private fb: FormBuilder, 
                private cs: CountriesService, 
                private rs: ReceiversService, 
                private ts: TransferService,
                private router: Router 
              ) {
    this.cs.getCountry().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.countries.push(doc.data());
      })
    })
    // console.log('payIn: ', this.payIn);
  }

  onSubmit() {
    let formData = this.sendMoneyForm.value;

    let smoData: Receivers = {
      country: formData.country,
      sendAmount: formData.sendAmount,
      receivedAmount: formData.receivedAmount,
      payMethod: formData.payMethod,
      payIn: formData.payIn,
      payOut: formData.payOut
    }

    this.rs.saveSmo(smoData);

    // formData.reset();
    console.log('Smo: '); 
    this.router.navigate(['/receiver']);
  }

  onCountrySelected() {
    // this.ts.receiveAmount = this.receiveAmount;
    // this.ts.selectedCountry = this.selectedCountry;
    // this.ts.sendAmount = this.sendAmount;
    // console.log(this.selectedCountry);
    this.convertCurr('send');
  }

  onCountrySelect(currency: string) {
    this.ts.updateSelectedCountry(currency);
  }

  convertCurr( type: string) {
    if ( type === 'send' ) {
      if ( this.selectedCountry && this.selectedCountry.usd && this.sendAmount ) {
        this.receivedAmount = this.sendAmount*this.selectedCountry.usd;
        // console.log('Received: ', this.receivedAmount);
        
      } else {
        this.receivedAmount = 0;
      }
    } else if ( type === 'receive' ) {
      if ( this.selectedCountry && this.selectedCountry.usd && this.receivedAmount ) {
        this.sendAmount = this.receivedAmount/this.selectedCountry.usd;
        // console.log('Sent: ', this.sendAmount);
        
      } else {
        this.sendAmount = 0;
      }
    }
  }

  onChange( event: any ) {
    // console.log(this.selectPayMethod);
    
    if ( this.selectPayMethod == 1 ) {
      this.showPayOnline = true;
      this.showPayInCash = false;
      // console.log(this.showPayOnline, this.showPayInCash);
    } else if ( this.selectPayMethod == 2 ) {
      this.showPayOnline = false;
      this.showPayInCash = true;
      // console.log('incash: ', this.showPayInCash); 
    }
  }

  // savePay (pay: any) {
  //   this.rs.savePay(pay.id, pay.value);
  // }
}
