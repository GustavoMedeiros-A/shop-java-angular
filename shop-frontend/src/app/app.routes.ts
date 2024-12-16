import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { MockResolver } from './resolve.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, resolve: { data: MockResolver} },
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupComponent, resolve: { data: MockResolver}},

];
