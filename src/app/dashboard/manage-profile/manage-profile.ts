import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfileService } from '../../core/services/profile';
import { IProfile } from '../../core/models/profile.model';

@Component({
  selector: 'app-manage-profile',
  imports: [FormsModule],
  templateUrl: './manage-profile.html',
  styleUrl: './manage-profile.css',
})
export class ManageProfile implements OnInit {

  profile: IProfile = {};
  message = '';

  selectedFile: File | null = null;

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


  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      const file = input.files[0];

      if (file.type.startsWith('image/')) {

        this.selectedFile = file;

      }

    }

  }


  onDrop(event: DragEvent) {

    event.preventDefault();

    if (
      event.dataTransfer?.files &&
      event.dataTransfer.files.length > 0
    ) {

      const file = event.dataTransfer.files[0];

      if (file.type.startsWith('image/')) {

        this.selectedFile = file;

      }

    }

  }


  saveProfile(myForm: NgForm) {

    if (myForm.valid) {

      const formData = new FormData();

      formData.append(
        'fullName',
        myForm.value.fullName || ''
      );

      formData.append(
        'title',
        myForm.value.title || ''
      );

      formData.append(
        'bio',
        myForm.value.bio || ''
      );

      formData.append(
        'email',
        myForm.value.email || ''
      );

      formData.append(
        'phone',
        myForm.value.phone || ''
      );

      formData.append(
        'location',
        myForm.value.location || ''
      );

      formData.append(
        'github',
        myForm.value.github || ''
      );

      formData.append(
        'linkedin',
        myForm.value.linkedin || ''
      );


      if (this.selectedFile) {

        formData.append(
          'avatar',
          this.selectedFile
        );

      }


      this._profileService
        .updateProfile(formData)
        .subscribe({

          next: () => {

            this.message = 'Saved successfully ✅';

            // مسح بيانات الفورم
            myForm.resetForm();

            // مسح الصورة المختارة
            this.selectedFile = null;

            this._cdr.detectChanges();


            setTimeout(() => {

              this.message = '';

              this._cdr.detectChanges();

            }, 3000);

          },

          error: (err) => {

            console.error(err);

            this.message = 'Something went wrong ❌';

            this._cdr.detectChanges();

          }

        });

    } else {

      this.message = 'Please type valid data';

    }

  }

}
