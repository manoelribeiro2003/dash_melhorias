import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTasks } from './view-tasks';

describe('ViewTasks', () => {
  let component: ViewTasks;
  let fixture: ComponentFixture<ViewTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTasks],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
