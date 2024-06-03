import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirendsBarComponent } from './firends-bar.component';

describe('FirendsBarComponent', () => {
  let component: FirendsBarComponent;
  let fixture: ComponentFixture<FirendsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirendsBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirendsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
