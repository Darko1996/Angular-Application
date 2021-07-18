import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import {AuthInterceptor} from './auth/auth.interceptor';
import {AngularMaterialModule} from './material.module';
import {DialogComponent} from './shared/dialog/dialog.component';
import {SharedLanguageMenuComponent} from './shared/shared-language-menu/shared-language-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EventsComponent,
    AddEventComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    EditEventComponent,
    DialogComponent,
    SharedLanguageMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
