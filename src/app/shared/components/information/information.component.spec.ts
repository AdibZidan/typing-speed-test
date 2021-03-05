import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InformationComponent } from './information.component';

describe('InformationComponent', () => {

  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InformationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

});
