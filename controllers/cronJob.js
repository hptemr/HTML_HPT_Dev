require('dotenv').config();

const triggerEmail = require('../helpers/triggerEmail');
var constants = require('./../config/constants')
let ObjectId = require('mongoose').Types.ObjectId;
const Appointment = require('../models/appointmentModel');
const commonHelper = require('../helpers/common');
var async = require("async");
const moment = require('moment');
const nodeCron = require('node-cron');


const notifyPatientAppoitmentEmail = async (hoursBefore,reminder_attr) => {
    try{
        //moment().utc().subtract(75, "minutes").toDate();
        const start = new Date();
        const end = new Date(start.getTime() + hoursBefore * 60 * 60 * 1000);
        console.log("start", start," >>>>>> end", end);
        //let query = {appointmentDate: { $gte: new Date(start), $lt: new Date(end) }}
        let query = {'patientObj.status': 'Active',appointmentDate: { $gte: new Date(start), $lt: new Date(end) },[reminder_attr]: false, status: { $in: ['Pending Intake Form','Scheduled']}};
        console.log(' >>>  Query >>>',query)

        let aggrQuery = [   
            {
                $group: {
                    _id: { patientId: "$patientId", caseName: "$caseName" },  
                    appointmentRow: { $first: "$$ROOT" }  
                }
            },
            {
                $replaceRoot: { newRoot: "$appointmentRow" }                
            },
            {
                "$lookup": {
                    from: "patients",
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patientObj"
                }
            },
            {
                $match: query
            },
            {
                $project: {
                    '_id':1,'appointmentDate': 1, 'appointmentEndTime': 1, 'appointmentId': 1,'caseName': 1,'doctorId':1,'caseType':1,'checkIn': 1, 'patientId': 1, 'practiceLocation': 1, 'status': 1, 'therapistId': 1,'createdAt': 1, 'updatedAt': 1,
                    'patientObj.firstName': 1, 'patientObj.lastName': 1,'patientObj.email': 1
                }
            },
            {
                $sort: { "createdAt": -1 }
            }
        ]
        // ,
        // {
        //     $limit: 1
        // }
        let appointmentList = await Appointment.aggregate(aggrQuery);
        console.log('appointmentListLength>>>',appointmentList.length)
        if(appointmentList.length>0){
            let template = '24hoursbeforeanappointment';
            if(hoursBefore==5){
                template = '5hoursbeforeanappointment';
            }

            for (const appointment of appointmentList) {
                const { _id,appointmentDate, patientObj,  } = appointment;
                if(_id){
                    let patientData = patientObj[0];
                    appointment.appointmentDate = commonHelper.dateModify(appointmentDate);
                    
                    await triggerEmail.appointmentNotificationPatient(template, appointment, patientData);

                    const updateData = { $set: {[reminder_attr]:true} }; 
                    const options = { upsert: true }; 
                    console.log(updateData);
                    await Appointment.updateOne({_id}, updateData,options);
                }
            }
        }
    } catch (error) {
        console.log("********get Patient Case List ***error***", error)
    }
}

//notify patient for an appoitment schedule email, Email should be trigger 24 hrs before the appoitment.
nodeCron.schedule('1 0 * * *', () => {
    console.log("*******24******")
    notifyPatientAppoitmentEmail(24,'notification_24hrs_sent'); 
});

//notify patient for an appoitment schedule email, Email should be trigger 5 hrs before the appoitment.
nodeCron.schedule('0 */1 * * *', () => {
    console.log("********5******")
    notifyPatientAppoitmentEmail(5,'notification_5hrs_sent');    
});