import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { SpecHelper } from '@shared/helpers/spec/spec.helper';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { DifficultySelectorComponent } from './difficulty-selector.component';

describe('DifficultySelectorComponent', () => {

  let component: DifficultySelectorComponent;
  let fixture: ComponentFixture<DifficultySelectorComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DifficultySelectorComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultySelectorComponent);
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

    it('Should have a defined difficulties property', () => {
      expect(component.difficulties).toBeDefined();
    });
  });

  describe('After initialization', () => {
    let dispatchSpy: jasmine.Spy;

    beforeEach(() => {
      dispatchSpy = spyOn(mockStore, 'dispatch');
      component.ngOnInit();
    });

    it('Should have a defined view$ property', () => {
      expect(component.view$).toBeDefined();
    });

    it('Should select a difficulty and update the views', () => {
      component.selectDifficulty(Difficulty.CHALLENGING);

      const args: any[][] = SpecHelper.getArguments(dispatchSpy);
      const actual: any[] = SpecHelper.flatten(args);
      const expected: any[] = [
        { difficulty: 'Challenging', type: 'Set Difficulty' },
        { viewType: 'difficultySelector', type: 'Hide View' },
        { viewType: 'form', type: 'Show View' },
        { viewType: 'footer', type: 'Show View' }
      ];

      expect(actual).toEqual(expected);
      expect(actual.length).toEqual(4);
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(4);
    });
  });

});
