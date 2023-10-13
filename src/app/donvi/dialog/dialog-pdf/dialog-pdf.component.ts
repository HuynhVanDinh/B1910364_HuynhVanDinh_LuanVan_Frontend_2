import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-pdf',
  templateUrl: './dialog-pdf.component.html',
  styleUrls: ['./dialog-pdf.component.css'],
})
export class DialogPdfComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
