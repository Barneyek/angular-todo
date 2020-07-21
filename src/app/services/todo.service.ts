import {Injectable} from '@angular/core';
import {Todo} from "../interfaces/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoName: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: Todo[] = [
    {id: 0, name: 'Event 1', completed: false, editing: false,},
    {id: 1, name: 'Event 2', completed: false, editing: false,},
    {id: 2, name: 'Event 3', completed: false, editing: false,},
  ];

  constructor() {}

  addTodo(todoName: string): void {
    if (todoName.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      name: todoName,
      completed: false,
      editing: false
    });

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

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.name = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
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
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed)
    }

    return this.todos;
  }
}
