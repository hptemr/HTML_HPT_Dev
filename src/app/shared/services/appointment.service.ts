import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  newAppointment: any = {
    id: '',
    data: {}
  };
  appointment = localStorage.getItem("appointments") ? localStorage.getItem("appointments") || '' : null
  
  private appointmentSource = new BehaviorSubject(this.appointment);
  currentAppointment = this.appointmentSource.asObservable();

  constructor() { }


  getAppointment(id:string): any[] {
    //console.log('id >>>',id,'appointments >>> ',this.appointment)
    const appointments = JSON.stringify(this.currentAppointment);
    //console.log('id ##>>>',id,'appointments >>> ',appointments)
    return appointments ? JSON.parse(appointments) : [];
  }


  addAppointment(id:string,appointment: any) {   
    this.newAppointment = this.currentAppointment; 
    //console.log(id,' >>>>>',this.newAppointment)
    this.newAppointment.push({id:id,data:appointment});
    localStorage.setItem("appointments",JSON.stringify(this.newAppointment))

    this.appointmentSource.next(appointment)
  }


}
