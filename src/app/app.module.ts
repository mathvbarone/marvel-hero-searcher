import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroDetailComponent,
    ModalComponent,
    ErrorModalComponent,
  ],
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ModalComponent,
    ErrorModalComponent
  ]
})
export class AppModule { }
