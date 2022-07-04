import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MapData } from 'src/app/components/map/map';

@Injectable({
  providedIn: 'root'
})
export class ReadApiService {
  map4g_endpoint = 'https://map-api-minds.apps.ocp.tmrnd.com.my/api/minds/evMap_4G';

  constructor(private httpClient: HttpClient) { }

  public get4gMapData(): Observable<MapData[]> {
    return this.httpClient.get<MapData[]>(this.map4g_endpoint);
  }
}
