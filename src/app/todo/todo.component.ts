import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models/model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup
  taskArray!: FormArray

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskArray = this.fb.array([])
    this.todoForm = this.createTodo()
  }

  submitForm() {
    const todo = this.todoForm.value as Todo
    console.info('>>> todo: ' , todo)
  }

  addTask() {
    const task = this.fb.group({
      task: this.fb.control('', [ Validators.required ] ),
      priority: this.fb.control('', [ Validators.required ] ),
      dueDate: this.fb.control('', [ Validators.required ] ),
    })
    this.taskArray.push(task)
  }

  deleteTask(i: number) {
    this.taskArray.removeAt(i)
  }

  // helper methods
  private createTodo() {
    return this.fb.group({
      name: this.fb.control('', [ Validators.required ] ),
      email: this.fb.control('', [ Validators.required, Validators.email ] ),
      tasks: this.taskArray
    })
  }
}
