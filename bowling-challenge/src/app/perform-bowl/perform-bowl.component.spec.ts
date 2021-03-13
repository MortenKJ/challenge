import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformBowlComponent } from './perform-bowl.component';

describe('PerformBowlComponent', () => {
  let component: PerformBowlComponent;
  let fixture: ComponentFixture<PerformBowlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformBowlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformBowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
