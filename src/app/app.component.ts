import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { CToasts } from './components/toasts/c-toasts.component';

import TodoApi from '../api/todo.api';
import Toastservice from '../services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, CToasts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TODOAPP';

  clearTodos(): void {
    TodoApi.clearSessionStorageTodos().then(() => {
      Toastservice.addSuccess('All todos cleared successfully');
      window.location.reload();
    })
  }
}
