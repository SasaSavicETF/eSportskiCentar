import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakmicenjeComponent } from './takmicenje.component';

describe('TakmicenjeComponent', () => {
  let component: TakmicenjeComponent;
  let fixture: ComponentFixture<TakmicenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TakmicenjeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakmicenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
