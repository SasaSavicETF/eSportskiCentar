import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipTerenaComponent } from './tip-terena.component';

describe('TipTerenaComponent', () => {
  let component: TipTerenaComponent;
  let fixture: ComponentFixture<TipTerenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipTerenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipTerenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
