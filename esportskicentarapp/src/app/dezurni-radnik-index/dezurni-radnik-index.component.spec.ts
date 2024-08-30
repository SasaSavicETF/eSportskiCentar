import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DezurniRadnikIndexComponent } from './dezurni-radnik-index.component';

describe('DezurniRadnikIndexComponent', () => {
  let component: DezurniRadnikIndexComponent;
  let fixture: ComponentFixture<DezurniRadnikIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DezurniRadnikIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DezurniRadnikIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
