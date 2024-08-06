import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlazComponent } from './ulaz.component';

describe('UlazComponent', () => {
  let component: UlazComponent;
  let fixture: ComponentFixture<UlazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UlazComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UlazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
