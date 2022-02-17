import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DataService } from '../../services/data.service';
import { Project } from '../../models/project.model';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.page.html',
  styleUrls: ['./new-project-modal.page.scss'],
})
export class NewProjectModalPage implements OnInit {

  newProject: Project = {
    name: '',
    color: '#3880ff'
  };

  showColors: boolean;

  constructor(
    private modalController: ModalController,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }


  colorSelected(event: ColorEvent){
    this.newProject.color = event.color.hex;
  }


  async save() {
    this.modalController.dismiss({reload: true});
    this.dataService.addProject(this.newProject);
  }

  close() {
    this.modalController.dismiss();
  }

}
