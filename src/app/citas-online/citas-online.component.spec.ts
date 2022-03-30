import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasOnlineComponent } from './citas-online.component';

describe('CitasOnlineComponent', () => {
  let component: CitasOnlineComponent;
  let fixture: ComponentFixture<CitasOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasOnlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
