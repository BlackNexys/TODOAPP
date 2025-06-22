import DateService from "../services/date.service";

export interface ITodo {
    Id?: number;
    Name?: string;
    Description?: string;
    Created?: number | null;
    Done?: boolean;
    Expenses?: number | null;
}

export default class Todo {
    Id?: number | null;
    Name?: string | null;
    Description?: string | null;
    Created?: Date | null;
    Done: boolean;
    Expenses: number = 0;

    constructor(params: ITodo) {
        this.Id = params.Id;
        this.Name = params.Name;
        this.Description = params.Description;
        this.Done = params.Done || false;
        this.Created = params.Created ? DateService.parseDate(params.Created) : null;
        this.Expenses = params.Expenses || 0;
    }
}