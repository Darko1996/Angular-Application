import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule, TransferState} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductsComponent} from './products/products.component';
import { AddProductComponent} from './products/add-product/add-product.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AuthInterceptor} from './interceptors/auth.interceptor';
import {AngularMaterialModule} from './material.module';
import {SharedDialogComponent} from './shared/shared-dialog/shared-dialog.component';
import {SharedLanguageMenuComponent} from './shared/shared-language-menu/shared-language-menu.component';
import {SharedLoaderComponent} from './shared/shared-loader/shared-loader.component';
import {LanguangeInterceptor} from './interceptors/languange.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {translateBrowserLoaderFactory} from './ssr-translate/translate-browser.loader';
import {StoreModule} from '@ngrx/store';
import {reducers} from './ngrx/app.reducer';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ProductsComponent,
    AddProductComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    EditProductComponent,
    SharedDialogComponent,
    SharedLanguageMenuComponent,
    SharedLoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      }
    }),
    StoreModule.forRoot(reducers),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LanguangeInterceptor, multi: true},
    HttpClient,
    TransferState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
