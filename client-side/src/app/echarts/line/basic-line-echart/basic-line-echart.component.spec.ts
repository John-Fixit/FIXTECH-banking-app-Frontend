import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLineEchartComponent } from './basic-line-echart.component';

describe('BasicLineEchartComponent', () => {
  let component: BasicLineEchartComponent;
  let fixture: ComponentFixture<BasicLineEchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLineEchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicLineEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
