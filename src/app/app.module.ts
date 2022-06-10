import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwentythreeComponent } from './pages/twentythree/twentythree.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarbtnComponent } from './components/sidebarbtn/sidebarbtn.component';
import { SearchAreaComponent } from './components/search-area/search-area.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    TwentythreeComponent,
    SidebarComponent,
    NavbarComponent,
    SidebarbtnComponent,
    SearchAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,

    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
