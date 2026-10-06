import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private _http: HttpClient = inject(HttpClient);

  private apiURL = 'http://localhost:5000/api/project';

  getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this.apiURL);
  }

  addProject(data: IProject) {
    return this._http.post(this.apiURL, data);
  }

  updateProject(id: string, data: IProject) {
    return this._http.put(this.apiURL + '/' + id, data);
  }

  deleteProject(id: string) {
    return this._http.delete(this.apiURL + '/' + id);
  }
}
