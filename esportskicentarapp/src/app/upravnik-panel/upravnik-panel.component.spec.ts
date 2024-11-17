import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpravnikPanelComponent } from './upravnik-panel.component';

describe('UpravnikPanelComponent', () => {
  let component: UpravnikPanelComponent;
  let fixture: ComponentFixture<UpravnikPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpravnikPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpravnikPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
