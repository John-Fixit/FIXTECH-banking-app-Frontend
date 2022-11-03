import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReactiveFormComponent } from './new-reactive-form.component';

describe('NewReactiveFormComponent', () => {
  let component: NewReactiveFormComponent;
  let fixture: ComponentFixture<NewReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReactiveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
