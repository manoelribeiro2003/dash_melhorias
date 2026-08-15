import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProjects } from './table-projects';

describe('TableProjects', () => {
  let component: TableProjects;
  let fixture: ComponentFixture<TableProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(TableProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
