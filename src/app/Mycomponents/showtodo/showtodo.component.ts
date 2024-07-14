import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Todo } from '../../Todo';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';



@Component({
  selector: 'app-showtodo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './showtodo.component.html',
  styleUrl: './showtodo.component.css'
})
export class ShowtodoComponent {
  @Input() todo!: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoEdit: EventEmitter<Todo> = new EventEmitter();

  myVar:string
  if(todo){
    this.myVar = todo.priority;
  }
  onClick(todo : Todo){
    console.log("triggered");
    this.todoDelete.emit(todo);
  }
  onEditClick(todo:Todo){
    this.todoEdit.emit(todo);
  }
}
