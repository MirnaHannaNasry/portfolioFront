import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private _http: HttpClient = inject(HttpClient);

  private apiURL = 'http://localhost:5000/api/profile';


  getProfile(): Observable<IProfile> {
    return this._http.get<IProfile>(this.apiURL);
  }


  updateProfile(data: FormData) {
    return this._http.put(this.apiURL, data);
  }

}
