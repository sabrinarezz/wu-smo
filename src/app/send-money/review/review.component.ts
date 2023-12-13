import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiversComponent } from 'src/app/receivers/receivers.component';
import { CountriesService } from 'src/app/services/countries.service';
import { ReceiversService } from 'src/app/services/receivers.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  receiverArray!: any;
  smoArray!: any;
  countriesArray!: any;
  countryArray!: any;
  countryId: any;

  constructor (
    private rs: ReceiversService,
    private cs: CountriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.rs.loadData().subscribe( val => {
      console.log('receiver: ', val);
      this.receiverArray = val;
    })
    this.rs.loadSMOData().subscribe( val => {
      console.log('smo: ', val);
      this.smoArray = val;
    })
    this.route.paramMap.subscribe( params => {
      // console.log(params);
      this.countryId = params.get('rid');
      // console.log(this.receiverId);
      this.cs.loadCountry(this.countryId).subscribe( val => {
        // console.log(val);
        this.countryArray = val;
        console.log('Review: ', this.countryArray)
      })
    })
  }
}
