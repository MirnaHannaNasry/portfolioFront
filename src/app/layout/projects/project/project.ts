
import { Component, Input } from '@angular/core';
import { IProject } from '../../../core/models/project.model';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  @Input() myProject!: IProject;
}

