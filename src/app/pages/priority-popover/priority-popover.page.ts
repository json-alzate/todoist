import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Project } from 'src/app/models/project.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-priority-popover',
  templateUrl: './priority-popover.page.html',
  styleUrls: ['./priority-popover.page.scss'],
})
export class PriorityPopoverPage implements OnInit {

  priorities = this.dataService.getPriorities();

  constructor(
    private popoverController: PopoverController,
    private dataService: DataService
  ) { }

  ngOnInit() {

  }

  select(priority) {
    this.popoverController.dismiss({ priority: priority.value });
  }

}
