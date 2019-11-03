import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { OnboardingNotebookComponent } from './notebook.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { routes } from 'app/app-routing.module';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';

describe('NotebookComponent', () => {
  let component: OnboardingNotebookComponent;
  let fixture: ComponentFixture<OnboardingNotebookComponent>;
  let location: Location;
  let router: Router;
  let onboardingService: OnboardingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingNotebookComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    onboardingService = TestBed.get(OnboardingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully set a notebook title', (() => {
    expect(onboardingService.notebook.title).toBeNull();
    component.notebookTitle = 'English Homework';
    component.createNotebook();
    expect(onboardingService.notebook.title).toBeTruthy();
  }));

  it('should produce errors if the title is above 30 characters', (() => {
    component.notebookTitle = 'shhhhhhhhhdhsadgsahdgsahjdhsajgdasjhgdasjhgdas';
    component.createNotebook();
    expect(component.errors.notebook).toBeTruthy();
  }));

  it('should produce errors when values are null', (() => {
    component.createNotebook();
    expect(component.errors.notebook).toBeTruthy();
  }));
});
