import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormComponent } from './shared/components/form/form.component';
import { InformationComponent } from './shared/components/information/information.component';
import { TextAreaComponent } from './shared/components/inputs/text-area/text-area.component';
import { WordsComponent } from './shared/components/words/words.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DifficultySelectorComponent,
        FooterComponent,
        HeaderComponent,
        HomePageComponent,
        FormComponent,
        InformationComponent,
        TextAreaComponent,
        WordsComponent
      ],
      providers: [provideMockStore()],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

});
