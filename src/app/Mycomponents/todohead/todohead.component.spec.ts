import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoheadComponent } from './todohead.component';

describe('TodoheadComponent', () => {
  let component: TodoheadComponent;
  let fixture: ComponentFixture<TodoheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoheadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
