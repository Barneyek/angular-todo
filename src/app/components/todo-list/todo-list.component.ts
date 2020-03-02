import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(1000, style({opacity: 1,  transform: 'translateY(0)'}))
      ]),
      
      transition(':leave', [
        animate(1000, style({opacity: 0,  transform: 'translateY(30px)'}))
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoName: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;

  constructor() {
  }

  ngOnInit() {
    this.idForTodo = 4;
    this.todoName = '';
    this.filter='all';
    this.beforeEditCache = '';
    this.todos = [
      {id: 0, name: 'Event 1', completed: false, editing: false,},
      {id: 1, name: 'Event 2', completed: false, editing: false,},
      {id: 2, name: 'Event 3', completed: false, editing: false,},
    ];
  }

  addTodo(): void {
    if (this.todoName.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      name: this.todoName,
      completed: false,
      editing: false
    });

    this.todoName = '';
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.name;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.name = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remaining(): number{
    return this.todos.filter(todo => !todo.completed).length;
  }
  
  atLeastOneCompleted(): boolean{
    return this.todos.filter(todo => todo.completed).length > 0;
  }
  
  clearCompleted(): void{
    this.todos = this.todos.filter(todo => !todo.completed);
  }
  
  checkAllTodos(): void{
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all')
    {
      return this.todos;
    }
    else if (this.filter ==='active')
    {
      return this.todos.filter(todo => !todo.completed)
    }
    else if (this.filter === 'completed'){
      return this.todos.filter(todo => todo.completed)
    }
    return this.todos;
  }
}
