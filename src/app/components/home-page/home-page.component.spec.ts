import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { FormComponent } from '@shared/components/form/form.component';
import { InformationComponent } from '@shared/components/information/information.component';
import { TextAreaComponent } from '@shared/components/inputs/text-area/text-area.component';
import { DifficultySelectorComponent } from '../difficulty-selector/difficulty-selector.component';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {

  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        InformationComponent,
        TextAreaComponent,
        DifficultySelectorComponent,
        HomePageComponent
      ],
      providers: [provideMockStore()],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

});
