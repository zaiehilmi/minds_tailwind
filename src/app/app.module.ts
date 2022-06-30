import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwentythreeComponent } from './pages/twentythree/twentythree.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarbtnComponent } from './components/sidebarbtn/sidebarbtn.component';
import { SearchAreaComponent } from './components/search-area/search-area.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PagesModule } from './pages/pages.module';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';
import { MapComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TwentythreeComponent,
    SidebarComponent,
    NavbarComponent,
    SidebarbtnComponent,
    SearchAreaComponent,
    InfoPanelComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    CommonModule,

    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
