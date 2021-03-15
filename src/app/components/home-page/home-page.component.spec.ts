import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormComponent } from '@shared/components/form/form.component';
import { InformationComponent } from '@shared/components/information/information.component';
import { TextAreaComponent } from '@shared/components/inputs/text-area/text-area.component';
import { InstructionsComponent } from '@shared/components/instructions/instructions.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { WordsComponent } from '@shared/components/words/words.component';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { DifficultySelectorComponent } from '../difficulty-selector/difficulty-selector.component';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {

  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        InformationComponent,
        TextAreaComponent,
        InstructionsComponent,
        WordsComponent,
        ModalComponent,
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
    mockStore = TestBed.inject(MockStore);
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('After initialization', () => {
    let dispatchSpy: jasmine.Spy;

    beforeEach(() => {
      dispatchSpy = spyOn(mockStore, 'dispatch');
      component.ngOnInit();
    });

    it('Should show the difficulty selector view', () => {
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith({
        viewType: 'difficultySelector',
        type: 'Show View'
      });
    });
  });

});
