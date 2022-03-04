import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonRouterOutlet, ModalController, PopoverController } from '@ionic/angular';

import { Project } from '../../models/project.model';
import { NewProjectModalPage } from '../new-project-modal/new-project-modal.page';

import { DataService } from '../../services/data.service';
import { Task } from 'src/app/models/task.model';


import { ProjectPopoverPage } from '../../pages/project-popover/project-popover.page';
import { PriorityPopoverPage } from '../../pages/priority-popover/priority-popover.page';

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
    due: new Date().toISOString(),
    priority: 4,
    projectId: 0
  };

  @ViewChild('due', { static: false}) due: ElementRef;



  constructor(
    private modalController: ModalController,
    private ionRouterOutlet: IonRouterOutlet,
    private dataService: DataService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.loadData();
  }


  async loadData() {
    this.projects = await this.dataService.getProjects();
    console.log('Los proyectos ', this.projects);

  }




  async addCategory() {

    console.log('click add category');

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
    const fakeProject = this.task.project;
    this.task.projectId = this.task.project ? fakeProject.id : null;

    this.dataService.addTask(this.task).then(() => {
      this.showTaskInput = false;
      this.loadData();
      this.task = {
        name: '',
        due: '',
        projectId: 0,
        priority: 4
      };
    });

  }


  async openProjectPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: ProjectPopoverPage,
      event
    });

    await popover.present();
    popover.onDidDismiss().then(result => {
      if (result.data && result.data.project) {
        this.task.project = result.data.project;
      }
    });
  }

  async openPriorityPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: PriorityPopoverPage,
      event
    });

    await popover.present();
    popover.onDidDismiss().then(result => {
      if (result.data && result.data.priority) {
        this.task.priority = result.data.priority;
      }
    });
  }


  getTaskColor() {
    const priorities = this.dataService.getPriorities();
    return priorities.find(priority => priority.value === this.task.priority)?.color;
  }


  selectDue(){   
    console.log(this.due);     
    this.due.nativeElement.click();
  }


}
