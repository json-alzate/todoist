import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import { Project } from '../../models/project.model';
import { NewProjectModalPage } from '../new-project-modal/new-project-modal.page';

import { DataService } from '../../services/data.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  projects: Project[];
  showTaskInput = false;

  task: Task = {
    name: '',
    project: 0,
    due: '',
    priority: 4
  };

  constructor(
    private modalController: ModalController,
    private ionRouterOutlet: IonRouterOutlet,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loadData();
  }


  async loadData() {
    this.projects = await this.dataService.getProjects();
    console.log('Los proyectos ', this.projects);

  }




  async addCategory() {
    const modal = await this.modalController.create({
      component: NewProjectModalPage,
      presentingElement: this.ionRouterOutlet.nativeEl,
      swipeToClose: false
    });

    await modal.present();


    const result = await modal.onDidDismiss();
    console.log(result)

    if (result?.data && result.data?.reload) {
      this.loadData();
    }

  }


  saveTask() {

    this.dataService.addTask(this.task).then(() => {
      this.showTaskInput = false;
      this.loadData();
      this.task = {
        name: '',
        project: 0,
        due: '',
        priority: 4
      };
    });

  }



}
