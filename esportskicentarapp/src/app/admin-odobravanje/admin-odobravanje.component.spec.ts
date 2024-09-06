import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOdobravanjeComponent } from './admin-odobravanje.component';

describe('AdminOdobravanjeComponent', () => {
  let component: AdminOdobravanjeComponent;
  let fixture: ComponentFixture<AdminOdobravanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminOdobravanjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOdobravanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
