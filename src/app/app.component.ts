import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoheadComponent } from './Mycomponents/todohead/todohead.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from './Todo';
import { ShowtodoComponent } from './Mycomponents/showtodo/showtodo.component';
import { EditTodoComponent } from './Mycomponents/edit-todo/edit-todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoheadComponent, FormsModule, CommonModule, ShowtodoComponent, EditTodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  toggle: number = 1;
  localTodos: string | null = null;
  title = 'todoApp';
  todos: Todo[] = [];

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.localTodos = localStorage.getItem("todos");
      if (this.localTodos === null) {
        this.todos = [];
      } else {
        this.todos = JSON.parse(this.localTodos);
      }
    }
  }

  deleteTodo(event: any) {
    console.log(this.todos);
    console.log(event, event.sn);

    this.todos = this.todos.filter(todo => todo.sn !== event.sn);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addlist(value: Todo) {
    console.log("Hello server");
    let len = this.todos.length;
    value.sn = len + 1;
    console.log(value);
    this.todos.push(value);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  editTodo(value: Todo) {
    this.toggle = 0;
  }
}
