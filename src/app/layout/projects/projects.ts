import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project.services.ts';
import { IProject } from '../../core/models/project.model';
import { Project } from './project/project';

@Component({
  imports: [Project],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {

  projects: IProject[] = [];

  constructor(
    private _projectService: ProjectService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this._projectService.getProjects().subscribe((data: IProject[]) => {

      this.projects = data;

      this._cdr.detectChanges();

    });

  }
}
