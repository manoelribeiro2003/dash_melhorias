import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteProject } from './dialog-delete-project';

describe('DialogDeleteProject', () => {
  let component: DialogDeleteProject;
  let fixture: ComponentFixture<DialogDeleteProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteProject],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDeleteProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
