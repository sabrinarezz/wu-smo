import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddReceiversComponent } from './add-receivers/add-receivers.component';
import { AuthGuard } from './guards/auth.guard';
import { EditReceiverComponent } from './edit-receiver/edit-receiver.component';
import { ReceiversComponent } from './receivers/receivers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'add', component: AddReceiversComponent },
  { path: 'edit', component: EditReceiverComponent },
  { path: 'edit/:rid', component: EditReceiverComponent },
  { path: 'receivers', component: ReceiversComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
