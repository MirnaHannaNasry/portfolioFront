import { TestBed } from '@angular/core/testing';

import { ProjectServicesTs } from './project.services.ts';

describe('ProjectServicesTs', () => {
  let service: ProjectServicesTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectServicesTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
