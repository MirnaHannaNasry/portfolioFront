import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProjectService } from '../../core/services/project.services.ts';
import { IProject } from '../../core/models/project.model';

@Component({
  selector: 'app-manage-projects',
  imports: [FormsModule],
  templateUrl: './manage-projects.html',
  styleUrl: './manage-projects.css',
})
export class ManageProjects implements OnInit {

  projects: IProject[] = [];

  showModal = false;

  editingId: string | null = null;

  tags: string[] = [];

  message = '';

  showDeleteModal = false;

  deleteId: string | null = null;


  constructor(
    private _projectService: ProjectService,
    private _cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.getData();
  }


  getData() {

    this._projectService
      .getProjects()
      .subscribe((data: IProject[]) => {

        this.projects = data;

        this._cdr.detectChanges();

      });

  }


  openAdd() {

    this.editingId = null;

    this.tags = [];

    this.message = '';

    this.showModal = true;

    this._cdr.detectChanges();

  }


  openEdit(project: IProject) {

    this.editingId = project._id!;

    this.tags = [...(project.tags || [])];

    this.message = '';

    this.showModal = true;

    this._cdr.detectChanges();

  }


  close() {

    this.showModal = false;

    this.editingId = null;

    this.tags = [];

    this.message = '';

    this._cdr.detectChanges();

  }


  addTag(tagInput: HTMLInputElement) {

    const tag = tagInput.value.trim();

    if (tag && !this.tags.includes(tag)) {

      this.tags.push(tag);

    }

    tagInput.value = '';

  }


  removeTag(index: number) {

    this.tags.splice(index, 1);

  }


  save(myForm: NgForm) {

    if (myForm.valid) {

      this.message = '';

      const data: IProject = {
        ...myForm.value,
        tags: [...this.tags]
      };


      const request = this.editingId

        ? this._projectService.updateProject(
            this.editingId,
            data
          )

        : this._projectService.addProject(data);


      request.subscribe({

        next: () => {

          this.close();

          this.getData();

        },

        error: (err) => {

          console.error(err);

          this.message = 'Something went wrong ❌';

          this._cdr.detectChanges();

        }

      });

    } else {

      this.message = 'Please type missing data';

    }

  }


  remove(id: string) {

    this.deleteId = id;

    this.showDeleteModal = true;

  }


  cancelDelete() {

    this.showDeleteModal = false;

    this.deleteId = null;

  }


  confirmDelete() {

    if (!this.deleteId) {

      return;

    }


    this._projectService
      .deleteProject(this.deleteId)
      .subscribe({

        next: () => {

          this.showDeleteModal = false;

          this.deleteId = null;

          this.getData();

        },

        error: (err) => {

          console.error(err);

          this.message = 'Something went wrong ❌';

          this.showDeleteModal = false;

          this._cdr.detectChanges();

        }

      });

  }

}
