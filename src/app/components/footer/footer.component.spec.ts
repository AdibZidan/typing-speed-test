import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { SpecHelper } from '@shared/helpers/spec/spec.helper';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { hideView, showView } from '@shared/store/actions/view/view.actions';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {

  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
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

    it('Should have a defined current year property', () => {
      expect(component.currentYear).toEqual(new Date().getFullYear());
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

    it('Should show the instructions view and hide both the form and footer views', () => {
      component.showInstructions();

      const args: any[][] = SpecHelper.getArguments(dispatchSpy);
      const actual: any[] = SpecHelper.flatten(args);

      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(3);
      expect(actual).toEqual([
        { viewType: ViewType.INSTRUCTIONS, type: showView.type },
        { viewType: ViewType.FORM, type: hideView.type },
        { viewType: ViewType.FOOTER, type: hideView.type }
      ]);
    });
  });

});
