
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SkillService } from '../../core/services/skill';
import { ISkill } from '../../core/models/skill.model';

@Component({
  selector: 'app-manage-skills',
  imports: [FormsModule],
  templateUrl: './manage-skills.html',
  styleUrl: './manage-skills.css',
})
export class ManageSkills implements OnInit {

  skills: ISkill[] = [];

  showModal = false;
  editingId: string | null = null;

  message = '';

  showDeleteModal = false;
  deleteId: string | null = null;

  selectedSkill: ISkill = {
    name: '',
    category: '',
    proficiency: 80,
    order: 0
  };

  constructor(
    private _skillService: SkillService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {

    this._skillService.getSkills().subscribe(data => {

      this.skills = data;

      this._cdr.detectChanges();

    });

  }


  openAdd() {

    this.editingId = null;

    this.message = '';

    this.selectedSkill = {
      name: '',
      category: '',
      proficiency: 80,
      order: 0
    };

    this.showModal = true;

    this._cdr.detectChanges();

  }


  openEdit(skill: ISkill) {

    this.editingId = skill._id!;

    this.message = '';

    this.selectedSkill = {
      name: skill.name,
      category: skill.category || '',
      proficiency: skill.proficiency ?? 80,
      order: skill.order ?? 0
    };

    this.showModal = true;

    this._cdr.detectChanges();

  }


  close() {

    this.showModal = false;

    this.editingId = null;

    this.message = '';

    this._cdr.detectChanges();

  }


  save(myForm: NgForm) {

    if (myForm.valid) {

      this.message = '';

      const data: ISkill = {
        ...myForm.value
      };


      const request = this.editingId

        ? this._skillService.updateSkill(
            this.editingId,
            data
          )

        : this._skillService.addSkill(data);


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

    this._cdr.detectChanges();

  }


  cancelDelete() {

    this.showDeleteModal = false;

    this.deleteId = null;

    this._cdr.detectChanges();

  }


  confirmDelete() {

    if (!this.deleteId) {
      return;
    }


    this._skillService
      .deleteSkill(this.deleteId)
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

          this.deleteId = null;

          this._cdr.detectChanges();

        }

      });

  }

}
