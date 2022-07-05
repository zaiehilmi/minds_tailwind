import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {
  private site_id = new BehaviorSubject<string>('-');
  private status = new BehaviorSubject<string>('-');
  private type_map = new BehaviorSubject<string>('-');
  private signal = new BehaviorSubject<string>('-');

  site_id$: Observable<string> = this.site_id.asObservable();
  status$: Observable<string> = this.status.asObservable();
  type_map$: Observable<string> = this.type_map.asObservable();
  signal$: Observable<string> = this.signal.asObservable();

  setSiteId(v: string) {
    this.site_id.next(v);
  }

  setStatus(v: string) {
    this.status.next(v);
  }

  setTypeMap(v: string) {
    this.type_map.next(v);
  }

  setSignal(v: string) {
    this.signal.next(v);
  }

}
