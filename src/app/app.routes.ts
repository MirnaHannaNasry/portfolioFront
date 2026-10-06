import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Projects } from './layout/projects/projects';
import { Skills } from './layout/skills/skills';
import { Profile } from './layout/profile/profile';


import { Dashboard } from './dashboard/dashboard';
import { Overview } from './dashboard/overview/overview';
import { ManageProjects } from './dashboard/manage-projects/manage-projects';
import { ManageProfile } from './dashboard/manage-profile/manage-profile';
import { ManageSkills } from './dashboard/manage-skills/manage-skills';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'projects',
        component: Projects
      },
      {
        path: 'skills',
        component: Skills
      }
    ]
  },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: Overview
      },
      {
        path: 'projects',
        component: ManageProjects
      },
      {
        path: 'profile',
        component: ManageProfile
      },
      {
        path: 'skills',
        component: ManageSkills
      }
    ]
  }
];
