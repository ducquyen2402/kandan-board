import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  taskList: Task[] = 
  [
    {
      name: "TODO",
      tasks: ["task1","task2"]
    },
    {
      name: "DOING",
      tasks: ["task3"]
    },
    {
      name: "DONE",
      tasks: ["task4"]
    }
  ];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addTask(input: HTMLInputElement, index: number){
    if (input.value !== '') {
      this.taskList[index].tasks.push(input.value);
      input.value = '';
    } else {
      alert ("Task name is required");
    }
  }

  removeTaskBlock(index: number) {
    this.taskList.splice(index, 1);
  }
}
