import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import {RegisterComponent} from './auth/register/register.component';
import {EditEventComponent} from './events/edit-event/edit-event.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'add-event', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'edit-event/:id', component: EditEventComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
