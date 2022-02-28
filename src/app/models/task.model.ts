import { Project } from './project.model';

export interface Task {
    id?: number;
    name: string;
    project?: Project;
    projectId: number
    priority?: number;
    due?: string;
    done?: boolean;
}