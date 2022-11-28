import { Component } from '@angular/core';
import { EditTaskService } from './../../services/edit-task.service';
import { TasksDataService } from './../../../../shared/services/tasks-data-service/tasks-data.service';
import { UpdateOneTaskBody } from './../../../../shared/models/interfaces/interfaces-board';
import { DragnDropService } from './../../services/dragn-drop.service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  constructor(
    private editTaskService: EditTaskService,
    private tasksDataService: TasksDataService,
    private dragnDropService: DragnDropService
  ) {}

  public taskForm = {
    title: this.editTaskService.checkTask.title,
    order: this.editTaskService.checkTask.order,
    description: this.editTaskService.checkTask.description,
    userId: this.editTaskService.checkTask.userId,
    boardId: this.editTaskService.getValCheckIdBoard$(),
    columnId: this.editTaskService.checkIdColumn,
  };

  public updateTask() {
    if (this.taskForm.title && this.taskForm.description) {
      const bodyRequest: UpdateOneTaskBody = this.taskForm;
      this.editTaskService.updateTask(bodyRequest);
      this.dragnDropService.setIsDisabledDrop$(false);
    }
  }

  public close() {
    this.editTaskService.closeEditModal$();
    this.dragnDropService.setIsDisabledDrop$(false);
  }
}
