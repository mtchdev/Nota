import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { OnboardingNotebookComponent } from './notebook.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from 'app/app-routing.module';
import { Router } from '@angular/router';

describe('NotebookComponent', () => {
  let component: OnboardingNotebookComponent;
  let fixture: ComponentFixture<OnboardingNotebookComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingNotebookComponent ],
      imports: [ AppModule, RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingNotebookComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
