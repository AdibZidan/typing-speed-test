import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { WordsComponent } from './words.component';

describe('WordsComponent', () => {

  let component: WordsComponent;
  let fixture: ComponentFixture<WordsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WordsComponent],
      providers: [provideMockStore({
        initialState: {
          words: {
            words: 'A Test',
            difficulty: undefined,
            letter: 'A'
          },
          views: {
            form: {
              isShown: true
            }
          }
        }
      })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Before initialization', () => {
    it('Should have an undefined view$ property', () => {
      expect(component.view$).toBeUndefined();
    });

    it('Should have an undefined words$ property', () => {
      expect(component.words$).toBeUndefined();
    });

    it('Should have an undefined letter property', () => {
      expect(component.letter).toBeUndefined();
    });
  });

  describe('After initialization', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should select the view, words and letter from the store', (doneFn: DoneFn) => {
      expect(component.letter).toEqual('A');

      component.view$.subscribe(({ isShown }): void => {
        expect(isShown).toEqual(true);

        doneFn();
      });

      component.words$.subscribe(({ words }): void => {
        expect(words).toEqual('A Test');

        doneFn();
      });
    });
  });

});
