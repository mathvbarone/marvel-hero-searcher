import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { NgbModule  } from '@ng-bootstrap/ng-bootstrap';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/components/modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { MarvelLogoComponent } from './shared/components/marvel-logo/marvel-logo.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroDetailComponent,
    ModalComponent,
    HeaderComponent,
    MarvelLogoComponent
  ],
  imports: [
    FormsModule,
    NgbModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ModalComponent
  ]
})
export class AppModule { }
