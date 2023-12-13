import { Injectable } from '@angular/core';
import { CountriesService } from './countries.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  selectedCountry: any;
  sendAmount: number = 0;
  receiveAmount: number = 0;

  private selectedCountrySubject = new BehaviorSubject<string>('');
  selectedCountryCurrency$: Observable<string> = this.selectedCountrySubject.asObservable();

  constructor( private cs: CountriesService ) {
    console.log('ts: ', this.selectedCountry);
   }

   updateSelectedCountry(curr: string) {
    this.selectedCountrySubject.next(curr);
   }

   setSelectedCountry(country: any) {
    this.selectedCountry = country;
   }

   getSelectedCountry() {
    return this.selectedCountry;
   }
}
