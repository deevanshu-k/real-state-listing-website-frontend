import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStates(): Observable<{ code: string, name: string }[]> {
    return this.http.get<{ code: string, name: string }[]>(environment.END_POINT + "/util/getAllStates");
  }

  getAllCities(statecode: string): Observable<string[]> {
    return this.http.get<string[]>(environment.END_POINT + "/util/getAllCity/" + statecode);
  }
}
