import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinansijeComponent } from './finansije.component';

describe('FinansijeComponent', () => {
  let component: FinansijeComponent;
  let fixture: ComponentFixture<FinansijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinansijeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinansijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
