import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/pageNotFound/page-not-found.component';
import { TodoListViewComponent } from './views/todoListView/todo-list-view.component';
import { TodoDetailsViewComponent } from './views/todoDetailsView/todo-details-view.component';
import { TodoCreateViewComponent } from './views/todoCreateView/todo-create-view.component';

export const routes: Routes = [
    { path: 'todo/new', component: TodoCreateViewComponent },
    { path: 'todo/:id', component: TodoDetailsViewComponent },
    { path: '', pathMatch: 'full', component: TodoListViewComponent },
    { path: '**', component: PageNotFoundComponent }
];
