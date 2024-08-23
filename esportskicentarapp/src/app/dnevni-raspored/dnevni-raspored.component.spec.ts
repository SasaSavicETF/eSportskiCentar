import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnevniRasporedComponent } from './dnevni-raspored.component';

describe('DnevniRasporedComponent', () => {
  let component: DnevniRasporedComponent;
  let fixture: ComponentFixture<DnevniRasporedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DnevniRasporedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnevniRasporedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
