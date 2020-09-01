import {Component, OnInit} from '@angular/core';
import {transition, trigger, style, animate} from '@angular/animations';
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(1000, style({opacity: 1, transform: 'translateY(0)'}))
      ]),

      transition(':leave', [
        animate(1000, style({opacity: 0, transform: 'translateY(30px)'}))
      ])
    ])
  ]
})

export class TodoListComponent implements OnInit {
  todoName: string;

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
    this.todoName = '';
  }

  addTodo(): void {
    if (this.todoName.trim().length === 0) {
      return;
    }
    this.todoService.addTodo(this.todoName);

    this.todoName = '';
  }
}
