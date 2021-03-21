import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { InformationComponent } from './information.component';

describe('InformationComponent', () => {

  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InformationComponent],
      providers: [provideMockStore({
        initialState: {
          totalErrors: 1,
          timer: 30,
          wordsPerMinute: 10,
          words: {
            words: 'A Test',
            difficulty: Difficulty.INTERMEDIATE
          }
        }
      })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Before initialization', () => {
    it('Should have an undefined difficulty$ property', () => {
      expect(component.difficulty$).toBeUndefined();
    });

    it('Should have an undefined totalErrors$ property', () => {
      expect(component.totalErrors$).toBeUndefined();
    });

    it('Should have an undefined totalWords$ property', () => {
      expect(component.totalWords$).toBeUndefined();
    });

    it('Should have an undefined wordsPerMinute$ property', () => {
      expect(component.wordsPerMinute$).toBeUndefined();
    });

    it('Should have an undefined timer$ property', () => {
      expect(component.timer$).toBeUndefined();
    });
  });

  describe('After initialization', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should set the states', (doneFn: DoneFn) => {
      component.difficulty$.subscribe((difficulty: Difficulty): void => {
        expect(difficulty).toEqual(Difficulty.INTERMEDIATE);

        doneFn();
      });

      component.totalErrors$.subscribe((totalErrors: number): void => {
        expect(totalErrors).toEqual(1);

        doneFn();
      });

      component.totalWords$.subscribe((totalWords: number): void => {
        expect(totalWords).toEqual(2);

        doneFn();
      });

      component.wordsPerMinute$.subscribe((wordsPerMinute: number): void => {
        expect(wordsPerMinute).toEqual(10);

        doneFn();
      });

      component.timer$.subscribe((timer: number): void => {
        expect(timer).toEqual(30);

        doneFn();
      });
    });
  });

});
