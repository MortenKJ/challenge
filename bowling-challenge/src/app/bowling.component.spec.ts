import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BowlingComponent } from './bowling.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BowlingComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BowlingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bowling-challenge'`, () => {
    const fixture = TestBed.createComponent(BowlingComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bowling-challenge');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(BowlingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('bowling-challenge app is running!');
  });
});
