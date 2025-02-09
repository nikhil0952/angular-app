import { Component,Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todohead',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todohead.component.html',
  styleUrl: './todohead.component.css'
})
export class TodoheadComponent {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter();
  title:string;
  description:string;
  date:string;
  priority:string;

  onSubmit(){
    const value = {
      sn:0,
      title:this.title,
      description:this.description,
      date:this.date,
      priority:this.priority,
      status:"to-do",
      todoHistory:[]
    }
    if(this.title && this.description && this.date && this.priority ){
      this.addTodo.emit(value);
    }else{
      alert("Please fill all fields!")
    }
    
    this.title="";
    this.description="";
    this.date="";
    this.priority="";
  }
  constructor(){
    
  }
}
