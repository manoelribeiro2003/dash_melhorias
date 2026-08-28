import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewProject } from './dialog-new-project';

describe('DialogNewProject', () => {
  let component: DialogNewProject;
  let fixture: ComponentFixture<DialogNewProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewProject],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogNewProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
