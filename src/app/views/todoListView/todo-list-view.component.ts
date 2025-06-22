// Core Angular imports
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material imports
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common'

// API imports
import TodoApi from '../../../api/todo.api';

// Model imports
import Todo, { ITodo } from '../../../models/todo.model';

// Service imports
import DateService from '../../../services/date.service';
import Toastservice from '../../../services/toast.service';

@Component({
    standalone: true,
    selector: 'app-list-view',
    templateUrl: './todo-list-view.component.html',
    styleUrls: ['./todo-list-view.component.scss'],
    imports: [CommonModule, MatTableModule, MatCheckboxModule, RouterModule, MatProgressBarModule],
})
export class TodoListViewComponent {
    todos: any[] = [];
    displayedColumns: string[] = ['done', 'id', 'name', 'created'];
    loading: boolean = false;

    ngOnInit() {
        this.loadTodos();
    }

    loadTodos() {
        this.loading = true;
        TodoApi.getTodos().then(todos => {
            this.todos = todos
                .map((todo) => new Todo(todo as ITodo));
            Toastservice.addSuccess('Todos loaded successfully');
            this.loading = false;
        }, error => {
            console.error('Error loading todos:', error);
            Toastservice.addError('Failed to load todos');
            this.loading = false;
        });
    }

    update(todo : Todo) {
        todo.Done = !todo.Done; // Toggle the Done status
        
        if (!todo.Id) {
            console.error('Todo does not have an Id:', todo);
            Toastservice.addError('Todo does not have an Id');
            return;
        }
        
        TodoApi.updateTodo(todo.Id, todo).then(() => {
            Toastservice.addSuccess('Todo updated successfully');
            this.loadTodos();
        }, error => {
            console.error('Error updating todo:', error);
            Toastservice.addError('Failed to update todo');
        });
    }


    formatDate(date: Date): string {
        return DateService.formatDate(date);
    }
}