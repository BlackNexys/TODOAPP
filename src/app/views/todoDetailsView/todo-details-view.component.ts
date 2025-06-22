// Core Angular imports
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router'

// Angular imports
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'

// API imports
import TodoApi from '../../../api/todo.api';

// Model imports
import Todo, { ITodo } from '../../../models/todo.model';

// Service imports
import DateService from '../../../services/date.service';
import CurrencyService from '../../../services/currency.service';
import Toastservice from '../../../services/toast.service';


@Component({
    standalone: true,
    selector: 'app-details-view',
    templateUrl: './todo-details-view.component.html',
    styleUrls: ['./todo-details-view.component.scss'],
    imports: [CommonModule, MatProgressBarModule, MatCardModule, RouterModule, MatIconModule]
})
export class TodoDetailsViewComponent {
    private router = inject(Router);
    id: string | number | null = null; // Assuming you will set this from the route or some other source
    todo: Todo | null = null;
    loading: boolean = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')
        this.loadTodos();
    }

    loadTodos() {
        this.loading = true;
        
        TodoApi.getTodos().then(todos => {
            const todo = todos.find((todo) => (todo.Id as number).toString() === this.id) || null;
            if (todo) {
                this.todo = new Todo(todo as ITodo);
            } else {
                console.warn('Todo not found with id:', this.id);
                Toastservice.addWarning('Todo not found');
            }
            this.loading = false;
        }, error => {
            console.error('Error loading todos:', error);
            Toastservice.addError('Failed to load todos');
            this.loading = false;
        });
    }

    update(todo: Todo) {
        todo.Done = !todo.Done; // Toggle the Done status
        if (todo.Id === null || todo.Id === undefined) {
            console.error('Todo ID is not set. Cannot update.');
            Toastservice.addError('Todo ID is not set. Cannot update.');
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

    delete(todo: Todo) {
        if (todo.Id === null || todo.Id === undefined) {
            console.error('Todo ID is not set. Cannot update.');
            Toastservice.addError('Todo ID is not set. Cannot update.');
            return;
        }
        if (todo && confirm('Are you sure you want to delete this todo?')) {
            TodoApi.deleteTodo(todo.Id).then(() => {
                Toastservice.addSuccess('Todo deleted successfully');
                this.router.navigate(['/']);
            }, error => {
                console.error('Error deleting todo:', error);
                Toastservice.addError('Failed to delete todo');
            });
        }
        
    }

    formatDate(date: Date): string {
        return DateService.formatDate(date);
    }

    formatCurrency(amount: number): string {
        return CurrencyService.formatCurrency(amount);
    }

    formatDaysAgo(date: Date): string {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
}