// Core Angular imports
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { FormsModule } from '@angular/forms';

// Angular imports
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common'

// API imports
import TodoApi from '../../../api/todo.api';

// Service imports
import Toastservice from '../../../services/toast.service';


@Component({
    standalone: true,
    selector: 'app-create-view',
    templateUrl: './todo-create-view.component.html',
    styleUrls: ['./todo-create-view.component.scss'],
    imports: [CommonModule, MatProgressBarModule, MatCardModule, RouterModule, FormsModule, MatInputModule, MatFormFieldModule]
})
export class TodoCreateViewComponent {
    private router = inject(Router);
    loading: boolean = false;

    submit(event: SubmitEvent): void {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (!data.Name || data.Name.trim() === '') {
            Toastservice.addError('Todo name is required');
            return;
        }
        
        TodoApi.addTodo(data).then(() => {
            Toastservice.addSuccess('Todo added successfully');
            (event.target as HTMLFormElement).reset();
            this.router.navigate(['/']);
        }, error => {
            console.error('Error adding todo:', error);
            Toastservice.addError('Failed to add todo');
        });
    }
}