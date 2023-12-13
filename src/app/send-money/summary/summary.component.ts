import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { ReceiversService } from 'src/app/services/receivers.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  
  SMOArray!: any;
  selectedCountry: any;
  sendAmount: number = 0;
  receivedAmount: number = 0;

  selectedCurr$: Observable<string>;

  constructor ( private fb: FormBuilder, 
                private cs: CountriesService, 
                private rs: ReceiversService, 
                private ts: TransferService,
                private router: Router  ) {
    // this.cs.getCountry().subscribe((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     this.countries.push(doc.data());
    //   })
    // })
    // this.rs.loadSMOData().subscribe( val => {
    //   console.log(val);
    //   this.SMOArray = val;
    // })
  this.selectedCurr$ = this.ts.selectedCountryCurrency$;
  console.log(this.selectedCurr$);
  }
}
