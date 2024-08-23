import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvlacionicaComponent } from './svlacionica.component';

describe('SvlacionicaComponent', () => {
  let component: SvlacionicaComponent;
  let fixture: ComponentFixture<SvlacionicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvlacionicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SvlacionicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
