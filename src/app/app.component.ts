import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './task.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
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

  constructor(public dialog: MatDialog) {}

  ngOnInit(){
    if (localStorage.getItem('TASKLIST')) {
      this.taskList = JSON.parse(localStorage.getItem('TASKLIST'));
    }
  }

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
      localStorage.setItem('TASKLIST', JSON.stringify(this.taskList));
    } else {
      alert ("Task name is required");
    }
  }

  addTaskBlock(input: HTMLInputElement){
    if (input.value !== '') {
      this.taskList.push(new Task(input.value, []));
      input.value = '';
      localStorage.setItem('TASKLIST', JSON.stringify(this.taskList));
    } else {
      alert ("Block name is required");
    }
  }

  removeTaskBlock(index: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskList.splice(index, 1);
      }
      localStorage.setItem('TASKLIST', JSON.stringify(this.taskList));
    });
  }

  removeTask(i: number, j: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskList[i].tasks.splice(j, 1);
      }
      localStorage.setItem('TASKLIST', JSON.stringify(this.taskList));
    });
  }  

}
