import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ReceiversComponent } from './receivers/receivers.component';
import { AddReceiversComponent } from './add-receivers/add-receivers.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditReceiverComponent } from './edit-receiver/edit-receiver.component';
import { HamburgerComponent } from './layouts/hamburger/hamburger.component';
import { DropdownModule } from 'primeng/dropdown';
import { SendMoneyComponent } from './send-money/send-money.component';
import { SendComponent } from './send-money/send/send.component';
import { SummaryComponent } from './send-money/summary/summary.component';
import { AddReceiverComponent } from './send-money/add-receiver/add-receiver.component';
import { ReviewComponent } from './send-money/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ReceiversComponent,
    AddReceiversComponent,
    EditReceiverComponent,
    HamburgerComponent,
    SendMoneyComponent,
    SendComponent,
    SummaryComponent,
    AddReceiverComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
