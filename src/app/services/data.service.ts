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
    console.log('projects', projects)
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

}