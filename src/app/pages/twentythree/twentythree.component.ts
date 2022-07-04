import { Component, OnInit } from '@angular/core';

import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-twentythree',
  templateUrl: './twentythree.component.html',
  styleUrls: ['./twentythree.component.css'],
  providers: [ToggleService],
})
export class TwentythreeComponent {

  constructor(public dropdown: ToggleService) { }

  openDropdown($event: Event) {
    $event.preventDefault();

    this.dropdown.toggleDropdown();
  }


}
