import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwentythreeComponent } from './pages/twentythree/twentythree.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarbtnComponent } from './components/sidebarbtn/sidebarbtn.component';

@NgModule({
  declarations: [
    AppComponent,
    TwentythreeComponent,
    SidebarComponent,
    NavbarComponent,
    SidebarbtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
