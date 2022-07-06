import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private toggle: iToggle[] = [];

  register(id: string) {
    this.toggle.push({
      id: id,
      visible: false
    });
  }

  isToggleShown(id: string): boolean {
    return Boolean(this.toggle.find(t => t.id === id)?.visible);
  }

  toggleComponent(id: string) {
    const _toggle = this.toggle.find(t => t.id === id);

    if (_toggle) _toggle.visible = !_toggle.visible;
  }


}

interface iToggle {
  id: string;
  visible: boolean;
}