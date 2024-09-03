import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogadjajPregledComponent } from './dogadjaj-pregled.component';

describe('DogadjajPregledComponent', () => {
  let component: DogadjajPregledComponent;
  let fixture: ComponentFixture<DogadjajPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogadjajPregledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogadjajPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
