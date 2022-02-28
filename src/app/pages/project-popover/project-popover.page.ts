import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Project } from 'src/app/models/project.model';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project-popover',
  templateUrl: './project-popover.page.html',
  styleUrls: ['./project-popover.page.scss'],
})
export class ProjectPopoverPage implements OnInit {

  projects = [];

  constructor(
    private popoverController: PopoverController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getProjects().then(projects => {
      this.projects = projects;
    })
  }

  selectProject(project: Project) {
    this.popoverController.dismiss({ project });
  }

}
