require('dotenv').config();

const triggerEmail = require('../helpers/triggerEmail');
var constants = require('./../config/constants')
let ObjectId = require('mongoose').Types.ObjectId;

const Appointment = require('../models/appointmentModel');
var async = require("async");
const moment = require('moment');
const nodeCron = require('node-cron');




const notifyPatientAppoitmentEmail = async () => {
    try{
        //Object.assign(query, { 'patientObj.status': 'Active'})
        //existingAppointmentData = await Appointment.find({ status:' data.id' });
        let start = moment().utc().subtract(75, "minutes").toDate();
        let end = moment().utc().subtract(15, "minutes").toDate();
      
        console.log("start", start);
        console.log("end", end);
        console.log(' >>>>>>>>>>>> ',moment().utc().toDate());
        
        let query = { 'patientObj.status': 'Active',appointmentDate: { $gte: start, $lt: end },status:  { $in: ['Pending Intake Form','Scheduled']}};
        console.log(' >>>  Query >>>',query)

        let aggrQuery = [   
            {
                $group: {
                    _id: { patientId: "$patientId", caseName: "$caseName" },  // Group by userId and name
                    appointmentRow: { $first: "$$ROOT" }  // Return the first appointment in each case
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
                    'appointmentDate': 1, 'appointmentEndTime': 1, 'appointmentId': 1,'caseName': 1,'doctorId':1,'caseType':1,'checkIn': 1, 'patientId': 1, 'practiceLocation': 1, 'status': 1, 'therapistId': 1,'createdAt': 1, 'updatedAt': 1,
                    'patientObj.firstName': 1, 'patientObj.lastName': 1,'patientObj.email': 1
                }
            },
            {
                $sort: { "createdAt": -1 }
            }
        ]

        let appointmentList = await Appointment.aggregate(aggrQuery);//.sort(order).skip(offset).limit(limit);
        console.log(' >>> Appointment List >>> ',appointmentList.length)           
    } catch (error) {
        console.log("********get Patient Case List ***error***", error)
        commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }
}



nodeCron.schedule('*/1 * * * *', () => {
    //notify patient for an appoitment schedule email, Email should be trigger 24 hrs and 5 hrs before the appoitment.
    notifyPatientAppoitmentEmail();    
});