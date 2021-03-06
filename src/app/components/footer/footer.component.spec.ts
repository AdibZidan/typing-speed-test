import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {

  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
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
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should have a defined view$ property', () => {
      expect(component.view$).toBeDefined();
    });
  });

});
