import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkipaComponent } from './ekipa.component';

describe('EkipaComponent', () => {
  let component: EkipaComponent;
  let fixture: ComponentFixture<EkipaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EkipaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EkipaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
