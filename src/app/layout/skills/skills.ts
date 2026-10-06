import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillService } from '../../core/services/skill';
import { ISkill } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {

  skills!: ISkill[];

  constructor(
    private _skillService: SkillService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._skillService.getSkills().subscribe(data => {
      this.skills = data;
      this._cdr.detectChanges();
    });
  }

}
