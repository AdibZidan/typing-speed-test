import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { SpecHelper } from '@shared/helpers/spec/spec.helper';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { stopTimer } from '@shared/store/actions/timer/timer.actions';
import { setLetter } from '@shared/store/actions/words/words.actions';
import { InformationComponent } from '../information/information.component';
import { TextAreaComponent } from '../inputs/text-area/text-area.component';
import { FormComponent } from './form.component';

describe('FormComponent', () => {

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InformationComponent,
        TextAreaComponent,
        FormComponent
      ],
      providers: [provideMockStore({
        initialState: {
          words: {
            words: 'A Test',
            difficulty: Difficulty.CHALLENGING,
            letter: 'A'
          }
        }
      })],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Before initialization', () => {
    it('Should have an undefined view$ property', () => {
      expect(component.view$).toBeUndefined();
    });

    it('Should have an undefined formGroup property', () => {
      expect(component.formGroup).toBeUndefined();
    });
  });

  describe('After initialization', () => {
    let dispatchSpy: jasmine.Spy;

    beforeEach(() => {
      dispatchSpy = spyOn(mockStore, 'dispatch');
      component.ngOnInit();
      component.ngAfterViewInit();
    });

    it('Should have a defined view$ property', () => {
      expect(component.view$).toBeDefined();
    });

    it('Should initialize the form', () => {
      expect(component.formGroup).toBeDefined();
      expect(component.formGroup.valid).toEqual(false);
      expect(component.formGroup.controls.text.value).toEqual('');
      expect(component.formGroup.controls.text.touched).toEqual(false);
    });

    it(`Shouln't start the timer or dispatch any actions, if the user didn't type first`, () => {
      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    it('Should dispatch actions only after typing', () => {
      component.formGroup.setValue({ text: 'A T' });

      const args: any[][] = SpecHelper.getArguments(dispatchSpy);
      const actual: any[] = SpecHelper.flatten(args);

      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(actual.length).toEqual(1);
      expect(actual).toEqual([
        { letter: 'A T', type: setLetter.type }
      ]);
    });

    it('Should stop the timer and reset the text value once the user finishes typing the whole sentence', () => {
      component.formGroup.setValue({ text: 'A Test' });

      const args: any[][] = SpecHelper.getArguments(dispatchSpy);
      const actual: any[] = SpecHelper.flatten(args);

      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
      expect(actual.length).toEqual(2);
      expect(actual).toEqual([
        { letter: 'A Test', type: setLetter.type },
        { type: stopTimer.type }
      ]);

      expect(component.formGroup.value).toEqual({ text: '' });
    });
  });

});
