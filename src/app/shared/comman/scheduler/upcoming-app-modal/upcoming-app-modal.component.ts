import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-upcoming-app-modal', 
  templateUrl: './upcoming-app-modal.component.html',
  styleUrl: './upcoming-app-modal.component.scss'
})
export class UpcomingAppModalComponent {

  public userId: string = this.authService.getLoggedInInfo('_id');
  userRole = this.authService.getLoggedInInfo('role')
  app_data:any=''
  upcomingAppointmentsList:any=[];
  whereCond: any = {}
  printBtnFlag:boolean=false
  noRecordsFlag:boolean=false
  waitFlag:boolean=true
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpcomingAppModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.app_data = data.app_data != undefined ? data.app_data : this.app_data;
    this.whereCond = {patientId: this.app_data.patientId, caseName: this.app_data.caseName, appointmentDate: {$gt:this.app_data.appointmentDate}, status:{ $in: ['Pending Intake Form','Scheduled'] } }
  }

  ngOnInit() {
    this.upcomingAppointments();
  }

  async upcomingAppointments(){
    let reqVars = {
      query: this.whereCond,
      eventQuery: {appointmentId:this.app_data.id},
      fields: { _id: 1, appointmentId: 1,status: 1, caseName: 1,appointmentDate: 1, appointmentType:1, appointmentEndTime:1 }, 
      order: { appointmentDate:-1 }
    }
    await this.authService.apiRequest('post', 'appointment/getUpcomingAppointments', reqVars).subscribe(async response => {
      if (response.data && response.data.appointmentList && response.data.appointmentList.length > 0) {
            this.upcomingAppointmentsList = response.data.appointmentList;    
            this.printBtnFlag = true;
      } else {
        this.noRecordsFlag = true
      }
      this.waitFlag = false;
    })
  }

  downloadPDF() {
    const element = document.getElementById('appointmentList'); // ID of the HTML content
    if (!element) return;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait orientation, millimeters, A4 size
      const imgWidth = 190; // Full width of A4 page
      const pageHeight = 297; // Full height of A4 page
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      const position = 5; // Padding from the top of the page

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      const timestamp = new Date().toISOString().replace(/[:\-]/g, '_').replace('T', '_').split('.')[0];
      pdf.save(`upcoming_appointments_${timestamp}.pdf`); // Save the file
    });
  }

  
}
