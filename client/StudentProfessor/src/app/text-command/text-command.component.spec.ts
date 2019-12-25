import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCommandComponent } from './text-command.component';

describe('TextCommandComponent', () => {
  let component: TextCommandComponent;
  let fixture: ComponentFixture<TextCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
