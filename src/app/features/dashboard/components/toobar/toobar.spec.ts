import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toobar } from './toobar';

describe('Toobar', () => {
  let component: Toobar;
  let fixture: ComponentFixture<Toobar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toobar],
    }).compileComponents();

    fixture = TestBed.createComponent(Toobar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
