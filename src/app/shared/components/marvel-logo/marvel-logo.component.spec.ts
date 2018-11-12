import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarvelLogoComponent } from './marvel-logo.component';

describe('MarvelLogoComponent', () => {
  let component: MarvelLogoComponent;
  let fixture: ComponentFixture<MarvelLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarvelLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarvelLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
