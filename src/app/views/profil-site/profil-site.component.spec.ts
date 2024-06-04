import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSiteComponent } from './profil-site.component';

describe('ProfilSiteComponent', () => {
  let component: ProfilSiteComponent;
  let fixture: ComponentFixture<ProfilSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
