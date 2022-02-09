import { Task } from './task.model';

export interface Project {
    id?: number
    name: string;
    color: string;
    task?: Task[];
}