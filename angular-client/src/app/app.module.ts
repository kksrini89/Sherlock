import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { TransactionData } from './services/transactions';
import { AppComponent } from './app.component';
import { FraudFinderComponent } from './fraud-finder/fraud-finder.component';

@NgModule({
  declarations: [AppComponent, FraudFinderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [TransactionData],
  bootstrap: [AppComponent]
})
export class AppModule { }
