import { Component, OnInit } from '@angular/core';
import {Todo } from '../../interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo:number;
  filter: string;
  anyRemainingModel: boolean;

  constructor() { }

  ngOnInit() {
    this.filter = 'all';
    this.idForTodo = 4;
    this.todoTitle='';
    this.todos = [
      {
        'id': 1,
        'title': 'Finish Angular Screencast',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'One more thing',
        'completed': false,
        'editing': false,
      },
    ];
  }

  addTodo(): void{
    if(this.todoTitle.trim().length == 0){
      return;
    }
    this.todos.push({
      id:this.idForTodo,
      title:this.todoTitle,
      completed:false,
      editing: false
    })

    this.todoTitle='';
    this.idForTodo++;
  }

  editTodo(todo : Todo): void{
    todo.editing = true;
  }

  deleteTodo(id: number): void{
    this.todos = this.todos.filter(todo=> todo.id != id);
  }

  remaining(): number{
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean{
    return this.todos.filter(todo => todo.completed).length 
    > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
