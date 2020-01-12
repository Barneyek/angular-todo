import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoName: string;
  idForTodo: number;

  constructor() {
  }

  ngOnInit() {
    this.idForTodo = 4;
    this.todoName = '';
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
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
