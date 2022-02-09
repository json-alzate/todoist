export interface Task {
    id?: number;
    name: string;
    project?: number;
    priority?: number;
    due?: string;
    done?: boolean;
}