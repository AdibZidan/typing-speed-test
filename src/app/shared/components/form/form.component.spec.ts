import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { InformationComponent } from '../information/information.component';
import { TextAreaComponent } from '../inputs/text-area/text-area.component';
import { FormComponent } from './form.component';

describe('FormComponent', () => {

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InformationComponent,
        TextAreaComponent,
        FormComponent
      ],
      providers: [provideMockStore()],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
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
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should have a defined view$ property', () => {
      expect(component.view$).toBeDefined();
    });

    it('Should have a defined formGroup property', () => {
      expect(component.formGroup).toBeDefined();
      expect(component.formGroup.valid).toEqual(false);
      expect(component.formGroup.controls.text.value).toEqual('');
      expect(component.formGroup.controls.text.touched).toEqual(false);
    });
  });

});
