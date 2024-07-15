import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoheadComponent } from './Mycomponents/todohead/todohead.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo,history } from './Todo';
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
  editIndex = 1;
  historyIndex = 0;
  dataHistory:history[];

  constructor() { 
    
    
  }

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
    console.log(this.todos);
  }

  addlist(value: Todo) {
    console.log("Hello server");
    let len = this.todos.length;
    value.sn = len + 1;
    
    
    value.todoHistory.push({
      timestamp: new Date(),
      action: 'New Todo Created',
    });
    this.todos.push(value);
    console.log(value);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  editTodo(value: Todo) {
    this.toggle = 0;
    this.editIndex = this.todos.findIndex(todo => todo.sn === value.sn);
    console.log(this.editIndex);

  }
  editList(value: Todo) {

    
    if(value != undefined){
      value.todoHistory.push({
        timestamp: new Date(),
        action: 'Edited todo successfully!',
      });
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.toggle = 1;
    
    

  }

  sortDate() {
    console.log("Running sorting");

    localStorage.setItem("todos", JSON.stringify(this.todos.sort(this.compareTasks)));
  }
  compareTasks(a: Todo, b: Todo): number {
    // Compare due dates
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;

    // If due dates are equal, compare priorities
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }


  sortStatus() {
    localStorage.setItem("todos", JSON.stringify(this.todos.sort(this.compareStatus)));
  }
  compareStatus(a: Todo, b: Todo): number {
    // Custom logic to compare by status
    const statusOrder = { 'to-do': 1, 'in-progress': 2, 'completed': 3 };

    if (statusOrder[a.status] < statusOrder[b.status]) return -1;
    if (statusOrder[a.status] > statusOrder[b.status]) return 1;


    if (a.status < b.status) return -1;
    if (a.status > b.status) return 1;


    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  sortPriority() {
    console.log("Runnnn");

    localStorage.setItem("todos", JSON.stringify(this.todos.sort(this.comparePriority)));
  }
  comparePriority(a: Todo, b: Todo): number {
    // Custom logic to compare by status
    const statusOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };

    if (statusOrder[a.priority] < statusOrder[b.priority]) return -1;
    if (statusOrder[a.priority] > statusOrder[b.priority]) return 1;


    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;


    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  exportCSV() {
    const csvData = this.convertToCSV(this.todos);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }
  convertToCSV(tasks: Todo[]): string {
    const headers = 'Title, Description, Date,  Priority, Status\n';
    const rows = tasks.map(task => `${task.title},${task.description},${task.date},${task.priority},${task.status}`).join('\n');
    return headers + rows;
  }

  showHistory(value:Todo){
    this.toggle = 2;
    console.log(value);
   
    this.historyIndex = this.todos.findIndex(todo => todo.sn === value.sn);
    console.log(this.historyIndex);
    this.dataHistory = this.todos[this.historyIndex].todoHistory;
    
  }
  moveBack(){
    this.toggle=1;
  }
}
