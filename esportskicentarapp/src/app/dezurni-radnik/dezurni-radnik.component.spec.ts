import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DezurniRadnikComponent } from './dezurni-radnik.component';

describe('DezurniRadnikComponent', () => {
  let component: DezurniRadnikComponent;
  let fixture: ComponentFixture<DezurniRadnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DezurniRadnikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DezurniRadnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
