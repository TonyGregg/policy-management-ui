import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PolicyService} from './services/policy.service';
import {HttpClientModule} from '@angular/common/http';
import { UiModule } from './ui/ui.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PolicyViewComponent } from './components/policyview/policyview.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {UserService} from './services/user.service';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PolicyViewComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents(null)
  ],
  providers: [PolicyService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
