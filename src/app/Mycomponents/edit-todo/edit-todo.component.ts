import { Component,Input,Output, EventEmitter} from '@angular/core';
import { Todo } from '../../Todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {
  @Input() todo: Todo;
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(){
    
  }
  submitForm(){
    console.log(this.todo);
    this.editTodo.emit(this.todo);
  }
}
