import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: object[];

  constructor() { }

  ngOnInit() {
    this.todos = [
      { 'id': 0, 'name': "Event 1", 'completed': false, 'editing': false, },
      { 'id': 1, 'name': "Event 2", 'completed': false, 'editing': false, },
      { 'id': 2, 'name': "Event 3", 'completed': false, 'editing': false, },
    ];
  }

}
