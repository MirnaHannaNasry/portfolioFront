import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile';
import { IProfile } from '../../core/models/profile.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  profile: IProfile = {};

  staticURL = 'http://localhost:5000';

  constructor(
    private _profileService: ProfileService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._profileService.getProfile().subscribe(data => {
      this.profile = data;
      this._cdr.detectChanges();
    });
  }

get imageUrl(): string {
  const url = this.profile?.avatarUrl;

  if (!url) {
    return '';
  }

  if (url.startsWith('http')) {
    return url;
  }

  return this.staticURL + url;
}
}
