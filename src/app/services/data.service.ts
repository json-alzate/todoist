import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

import { Project } from '../models/project.model';
import { Task } from '../models/task.model';

const PROJECT_KEY = 'categories';
const TASK_KEY = 'task';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async addProject(project: Project) {
    let projectsArray = await this.getProjectsAsArray(false);
    project.id = Date.now();
    projectsArray.push(project);
    return Storage.set({ key: PROJECT_KEY, value: JSON.stringify(projectsArray) });
  }

  async getProjects() {
    return this.getProjectsAsArray();
  }

  private async getProjectsAsArray(addInbox = true) {
    const projects = await Storage.get({ key: PROJECT_KEY });
    let projectsArray = [];
    if (projects.value) {
      projectsArray = JSON.parse(projects.value);
    }

    if (addInbox) {
      projectsArray.push({
        name: 'Inbox',
        color: '#929449c',
        id: 0,
        tasks: []
      });
    }

    return projectsArray;

  }


  // Task

  async addTask(task: Task) {
    let taskArray = await this.getTaskAsArray();
    task.id = Date.now();
    taskArray.push(task);
    return Storage.set({ key: TASK_KEY, value: JSON.stringify(taskArray) })
  }

  async getTasks() {
    return this.getTaskAsArray();
  }

  private async getTaskAsArray() {
    const tasks = await Storage.get({ key: TASK_KEY });
    let taskArray = [];
    if (tasks.value) {
      taskArray = JSON.parse(tasks.value);
    }
    return taskArray;
  }

  // tools
  getPriorities() {
    return [
      {
        value: 1,
        color: '#ff0000'
      },
      {
        value: 2,
        color: '#ff9d46'
      },
      {
        value: 3,
        color: '#0000ff'
      },
      {
        value: 4,
        color: '#737373'
      }
    ];
  }


}