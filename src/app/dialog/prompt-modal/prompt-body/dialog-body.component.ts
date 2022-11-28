import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../service/modal-prompt.service';
@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss'],
})
export class DialogBodyComponent implements OnInit {
  public form!: FormGroup;

  public isOneFieldForm: boolean;

  constructor(
    private countFiledFormService: ModalService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string }
  ) {
    this.isOneFieldForm = this.countFiledFormService.isOneFiledForm();
  }

  ngOnInit(): void {
    if (!this.isOneFieldForm) {
      this.form = this.fb.group({
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
      });
    } else {
      this.form = this.fb.group({
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      value: form,
    });
  }
}
