import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    console.log(this.showDropdown);
  }

  isDropdownShown() {
    return this.showDropdown;
  }

}
