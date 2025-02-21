import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSiteComponent } from './login-site.component';

describe('LoginSiteComponent', () => {
  let component: LoginSiteComponent;
  let fixture: ComponentFixture<LoginSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
