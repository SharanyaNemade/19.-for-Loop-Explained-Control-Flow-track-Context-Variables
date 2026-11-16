import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CSSRules } from './css-rules';

describe('CSSRules', () => {
  let component: CSSRules;
  let fixture: ComponentFixture<CSSRules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSSRules],
    }).compileComponents();

    fixture = TestBed.createComponent(CSSRules);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
