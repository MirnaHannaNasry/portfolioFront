
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkill } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {

  private _http: HttpClient = inject(HttpClient);

  private apiURL = 'http://localhost:5000/api/skill';

  getSkills(): Observable<ISkill[]> {
    return this._http.get<ISkill[]>(this.apiURL);
  }

  addSkill(data: ISkill) {
    return this._http.post(this.apiURL, data);
  }

  updateSkill(id: string, data: ISkill) {
    return this._http.put(this.apiURL + '/' + id, data);
  }

  deleteSkill(id: string) {
    return this._http.delete(this.apiURL + '/' + id);
  }

}
