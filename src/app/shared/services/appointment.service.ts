import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  //newAppointment: any = [];
 // newAppointment: { [id: string]: any[] } = {};
  appointment = localStorage.getItem("appointment") ? localStorage.getItem("appointment") || '' : null
  
  private appointmentSource = new BehaviorSubject(this.appointment);
  currentAppointment = this.appointmentSource.asObservable();

  constructor() { }


  // getAppointment(id:string): any[] {
  //   //console.log('id >>>',id,'appointments >>> ',this.appointment)
  //   const appointments = JSON.stringify(this.currentAppointment);
  //   //console.log('id ##>>>',id,'appointments >>> ',appointments)
  //   return appointments ? JSON.parse(appointments) : [];
  // }


  // addAppointment(id:string,appointment_data: any) {   
  //   //this.newAppointment = this.currentAppointment; 
  //   console.log('newAppointment >>>>>',this.newAppointment)
  //   console.log(id,' appointment >>>>>',appointment_data)
  //  // let newRecords = [];
  //   //let newRecords[id] = {'data': appointment}    this.newAppointment.push(newRecords);
  //   this.newAppointment[id] = appointment_data;
  //   //this.newAppointment[id].push(appointment_data);

  //   //localStorage.setItem("appointments",JSON.stringify(this.newAppointment))
  //   console.log('### >>>>>',this.newAppointment)
  //   this.appointmentSource.next(appointment_data)
  // }

  addAppointmentData(appointmentId:string,appointment: any) {
    console.log('appointment........',appointment)
    console.log(appointmentId,'>>>>>>>> current appointment >>>>>',this.currentAppointment)
    // if(this.appointment[appointmentId]){
    //   console.log('111111111111')
    // }else{
    //   console.log('22222222')
    // }
    localStorage.setItem("appointment", JSON.stringify(appointment))
    this.appointmentSource.next(appointment)
  }

}
