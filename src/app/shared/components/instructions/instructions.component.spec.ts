import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { SpecHelper } from '@shared/helpers/spec/spec.helper';
import { View } from '@shared/interfaces/view/view.interface';
import { Views } from '@shared/interfaces/views/views.interface';
import { hideView, showView } from '@shared/store/actions/view/view.actions';
import { InstructionsComponent } from './instructions.component';

describe('InstructionsComponent', () => {

  let component: InstructionsComponent;
  let fixture: ComponentFixture<InstructionsComponent>;
  let mockStore: MockStore<Views>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionsComponent],
      providers: [provideMockStore({
        initialState: {
          views: {
            instructions: {
              isShown: true
            },
            form: {
              isShown: false
            },
            footer: {
              isShown: false
            }
          }
        }
      })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsComponent);
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
  });

  describe('After initialization', () => {
    let dispatchSpy: jasmine.Spy;

    beforeEach(() => {
      dispatchSpy = spyOn(mockStore, 'dispatch');
      component.ngOnInit();
    });

    it('Should select the instructions view from the store', (doneFn: DoneFn) => {
      component.view$
        .subscribe((view: View): void => {
          expect(view.isShown).toEqual(true);

          doneFn();
        });
    });

    it('Should go back to the form view', () => {
      component.goBackToFormView();

      const args: any[][] = SpecHelper.getArguments(dispatchSpy);
      const actual: any[] = SpecHelper.flatten(args);

      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(3);
      expect(actual.length).toEqual(3);
      expect(actual).toEqual([
        { viewType: ViewType.INSTRUCTIONS, type: hideView.type },
        { viewType: ViewType.FORM, type: showView.type },
        { viewType: ViewType.FOOTER, type: showView.type }
      ]);
    });
  });

});
