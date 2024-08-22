import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CjenovnikComponent } from './cjenovnik.component';

describe('CjenovnikComponent', () => {
  let component: CjenovnikComponent;
  let fixture: ComponentFixture<CjenovnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CjenovnikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CjenovnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
