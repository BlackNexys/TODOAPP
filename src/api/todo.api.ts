import { ITodo } from '../models/todo.model';

export default class TodoApi {
    static baseUrl = 'https://boyumcodechallenge.azurewebsites.net/api/todolist';

    static async getTodos(): Promise<ITodo[]> {
        const todos = TodoApi.fetchSessionStorageTodos();
        if (todos.length > 0) {
            // Return cached todos if available
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(todos);
                }, 1000); // Simulate network delay
            });
        }
        // Fetch from API if no cached todos
        const response = await fetch(TodoApi.baseUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Simulate a delay to mimic network latency
        sessionStorage.setItem('todos', JSON.stringify(data));

        return data;
    }

    static async addTodo(todo: any): Promise<ITodo> {
        const todos = TodoApi.fetchSessionStorageTodos();
        const newTodo = {
            Id: todos.length + 1, // Simple ID generation
            Created: new Date().toISOString(),
            Done: false,
            ...todo,
            Expenses: parseFloat(todo.Expenses) || 0 // Ensure Expenses is set
        };
        todos.push(newTodo);
        sessionStorage.setItem('todos', JSON.stringify(todos));
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(newTodo);
            }, 1000);
        });
    }

    static async updateTodo(id: number, todo: any): Promise<any> {
        const todos = TodoApi.fetchSessionStorageTodos();
        const updatedTodos = todos.map((t: ITodo) => t.Id === id ? { ...t, ...todo } : t);
        sessionStorage.setItem('todos', JSON.stringify(updatedTodos));
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: id,
                    ...todo
                });
            }, 1000);
        });
    }

    static async deleteTodo(id: number): Promise<void> {
        const todos = TodoApi.fetchSessionStorageTodos();
        const updatedTodos = todos.filter((t: ITodo) => t.Id !== id);
        sessionStorage.setItem('todos', JSON.stringify(updatedTodos));
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    static fetchSessionStorageTodos(): ITodo[] {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const todos = sessionStorage.getItem('todos');
            if (todos) {
                return JSON.parse(todos);
            }
        }
        return [];
    }

    static clearSessionStorageTodos(): Promise<void> {
        return new Promise((resolve) => {
            if (sessionStorage) {
                sessionStorage.removeItem('todos');
            }
            resolve();
        });
    }
}