const { commonMessage, appointmentMessage, infoMessage, soapMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const Appointment = require('../models/appointmentModel');
const caseNotes = require('../models/caseNotesModel');

// const PlanTemp = require('../models/planModel');
// const BillingTemp = require('../models/billingModel');
// const subjectiveTemp = require('../models/subjectiveModel');
// const AssessmentModel = require('../models/assessmentModel');
// const Case = require('../models/casesModel');
// const ObjectiveModel = require('../models/objectiveModel');
const sopeNoteModel = require('../models/sopeNotesModel');
const faxTemp = require('../models/faxDetailsModel');
const sendEmailServices = require('../helpers/sendEmail');
var constants = require('./../config/constants')
const moment = require('moment');
require('dotenv').config();
let ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const apiKey = constants.faxDetails.apiKey;
const apiSecret = constants.faxDetails.apiSecret;
const User = require('../models/userModel');
const tebraController = require('../controllers/tebraController');

const getSubjectiveData = async (req, res) => {
  try {
    const { query, addendumId, soap_note_type } = req.body;

    let appointmentData = await Appointment.findOne({ _id: query.appointmentId }).populate('patientId', { firstName: 1, lastName: 1 })

    let subjectiveData = await sopeNoteModel.findOne(query).sort({ createdAt: -1 });

    let appointmentDatesList = [];
    if(appointmentData){         
      appointmentDatesList = await subjectiveAppointmentsList({'patientId':appointmentData.patientId._id,'caseName':appointmentData.caseName},soap_note_type)   
    }
   
    let returnData = { subjectiveData: subjectiveData, appointmentDatesList: appointmentDatesList, appointmentData: appointmentData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    console.log('get subjective data error >>>>',error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const submitSubjective = async (req, res) => {
  try {
    const { data,userId,soapnoteId,addendumId,appointmentId,soap_note_type } = req.body;
    let message = soapMessage.subjective
    let filterPlan = { appointmentId: new ObjectId(appointmentId),note_type:soap_note_type };
    if (soapnoteId) {     
        // filterPlan = { _id:new ObjectId(soapnoteId),appointmentId: new ObjectId(appointmentId),soap_note_type:soap_note_type };
        // let optionsUpdatePlan = { returnOriginal: false };
        // await sopeNoteModel.findOneAndUpdate(filterPlan, data, optionsUpdatePlan);
        message = soapMessage.subjectiveUpdated;
    } else {
      let soapnoteId = new ObjectId();

      const updateAppointmentData = {           
        $set: {
          soap_notes: {
            soapnoteId:new ObjectId(soapnoteId),
            note_type:soap_note_type,
            status: 'Draft',
            created_by:new ObjectId(userId),
            created_at:new Date(),
            updatedAt:new Date()
          }
        }
      };
      const options = { returnOriginal: false };
      console.log('Update Appointment Data >>>',updateAppointmentData)
      await Appointment.findOneAndUpdate({ _id: appointmentId }, updateAppointmentData,options);

      let insert_data = {};
      insert_data.appointmentId = appointmentId;
      insert_data.soapnoteId = soapnoteId;
      insert_data.soap_note_type = soap_note_type;
      insert_data.status = 'Draft';
      insert_data.notes = {
        note_type:'subjective',
        note_date:data.note_date,
        diagnosis_code :data.diagnosis_code,
        treatment_side:data.note_date,
        surgery_date: data.surgery_date,
        subjective_note:data.note_date,
        updateInfo:data.updateInfo
      }
      console.log('insert_data>>>',insert_data)
      await sopeNoteModel.create(insert_data)
      message = soapMessage.subjective
      if (soap_note_type && soap_note_type != 'daily_note') {
        console.log("********HERE*********" )
        await setAssessment(req,soapnoteId)
      }
    }
    commonHelper.sendResponse(res, 'success', {}, message);
  } catch (error) {
    console.log("*****************error", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

async function setAssessment(req,soapnoteId) {
  const { data } = req.body;
  let appointmentData = await Appointment.findOne({ _id: data.appointmentId }, { patientId: 1, appointmentDate: 1 }).populate('patientId', { firstName: 1, lastName: 1 })
   let assessment_icd = []
   let patientName = appointmentData.patientId.firstName + " " + appointmentData.patientId.lastName
   let todayDate = new Date(appointmentData.appointmentDate).toLocaleString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" });
   data.diagnosis_code.forEach(element => {
     assessment_icd.push({
       problem: element.name + " limiting function",
       long_term_goal: "Improve " + element.name + " to restore function"
     })
   });
    // caseId: data.caseId,
    // soap_note_type: data.soap_note_type,

   let assessmentInsert = {
     note_type:'assessment',
     appointmentId: data.appointmentId,
     assessment_icd: assessment_icd,
     assessment_text: "Thank you for referring " + patientName + " to our practice, " + patientName + " received  an initial evaluation and treatment today " + todayDate + ". As per your referral, we will see " + patientName + " ___ times per week for ___ weeks with a focus on *first 3 treatments to be added*. I will update you on " + patientName + " progress as appropriate, thank you for the opportunity to assist with their rehabilitation.",
     supporting_documentation_text: "1. Neuromuscular Re-education completed to assist with reactive and postural responses, and improving anticipatory responses for dynamic activities. =Neuromuscular Re-Education, 97112 \n 2.Therapeutic Activity completed for improving functional transitioning performance to assist in performance of ADL's= Therapeutic Activity, 97530 \n 3. Patient is unable to complete physical therapy on land. = Aquatic Exercise, 97113 \n 4. Vasopneumatic device required to assist with reduction in effusion in combination with cryotherapy to improve functional performance through reduced effusion and improved range of motion and motor facilitation and / or used as contrast or thermotherapy to improve circulation, modulate pain, and improve functional range of motion = Vasopneumatic Device 97016 \n 5. If any item from the DME section is selected then the following data is shown in the Supporting Documentation Page with a space between any content present above, if it is present.Text to be added: DME was issued today with instructions on wear, care, and use required for full rehabilitation potential",
   }
   console.log('assessment Insert>>>',assessmentInsert)
   let filterPlan = { soapnoteId:soapnoteId,appointmentId: data.appointmentId, soap_note_type: data.soap_note_type};

   let assessmentData = await sopeNoteModel.findOne({ soapnoteId:soapnoteId,appointmentId: data.appointmentId, soap_note_type: data.soap_note_type});//,notes:{$in:{note_type:'assessment'}} 
   let notes = assessmentData.notes
   console.log('assessment FIND>>>',assessmentData)
   if (!assessmentData && data.diagnosis_code && data.diagnosis_code.length > 0) {
      //await sopeNoteModel.create(assessmentInsert)
   } else if (data.diagnosis_code && data.diagnosis_code.length > 0) {
      assessmentData = assessmentData.notes.filter(task => task.note_type === 'assessment');
      console.log('assessmentData filter >>>',assessmentData)
      //assessmentData.notes = assessmentInsert;
      if(assessmentData.length==0){
        let update3 = {
          $set: {"notes.$": assessmentInsert}
        };


       let update = { $push: { notes: assessmentInsert } };
       console.log('update1 >>>',update)
      await sopeNoteModel.updateOne(filterPlan, update);
      }

   }
}

const getObjectiveData = async (req, res) => {
  try {
    const { query } = req.body;
    let appointmentData = await Appointment.findOne({ _id: query.appointmentId }).populate('patientId', { firstName: 1, lastName: 1,patientId:1 })

    let objectiveData = [];//await ObjectiveModel.findOne({ ...query, status: "Draft" });
    let subjectiveData = [];//await subjectiveTemp.findOne({ ...query, status: "Draft" });
   
    let returnData = { objectiveData: objectiveData, subjectiveData: subjectiveData, appointmentData: appointmentData }
    commonHelper.sendResponse(res, 'success', returnData);
  } catch (error) {
    console.log('objectiveData >>> ',error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const submitObjective = async (req, res) => {
  try {
    const { data, userId, soapnoteId, addendumId, appointmentId, soap_note_type } = req.body;
    let message = '';
    if (soapnoteId) {   

    }else{
    
      let soapnoteId = new ObjectId();
      let sope_data = await sopeNoteModel.findOne({ appointmentId:appointmentId, soap_note_type:soap_note_type });
      let insert_data = {};
      if(sope_data && sope_data.notes){
        soapnoteId = sope_data.soapnoteId;
      }else{
        insert_data.appointmentId = appointmentId;
        insert_data.soapnoteId = soapnoteId;
        insert_data.soap_note_type = soap_note_type;
        insert_data.status = 'Draft';
      }
      console.log('soapnoteId >>>>>>>',soapnoteId); 
      let filterPlan = { soapnoteId:soapnoteId,appointmentId: appointmentId, soap_note_type:soap_note_type};

      insert_data = {
        note_type:'objective',
        protocols:data.protocols,
        precautions :data.precautions,
        patient_consent:data.patient_consent,
        chaperone: data.chaperone,
        observation:data.observation,
        range_of_motion :data.range_of_motion,
        patient_consent:data.strength,
        neurological :data.neurological,
        special_test:data.special_test,
        palpation:data.palpation,
        outcome_measures:data.outcome_measures,        
        land_exercise:data.land_exercise,
        aquatic_exercise :data.aquatic_exercise,
        slp:data.slp,
        ot:data.ot,
        treatment_provided:data.treatment_provided,
        updateInfo:data.updateInfo
      }
      let objectiveData = await sopeNoteModel.findOne({ soapnoteId:soapnoteId, appointmentId:appointmentId, soap_note_type:soap_note_type});

      objectiveData = objectiveData.notes.filter(task => task.note_type === 'objective');
      console.log('objective data filter >>>',objectiveData)
      if(objectiveData.length==0){
       let update = { $push: { notes: insert_data } };
       console.log('update >>>',update)
       await sopeNoteModel.updateOne(filterPlan, update);
       message = soapMessage.addObjective;
      }else{
        message = soapMessage.updateObjective;
      }
    }

    commonHelper.sendResponse(res, 'success', {}, message);
  } catch (error) {
    console.log('objectiveData >>> ',error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const submitObjectiveExercise = async (req, res) => {
  try {
    const { data, query, exerciseType,addendumId, userId, type } = req.body;
    let objective_exercise_data = await ObjectiveModel.findOne(query);

    let message = '';
    if (objective_exercise_data) {
      if(addendumId!=undefined){
      
      }else{
        if (exerciseType == 'Land Flowsheet') {
          objective_exercise_data.land_exercise.push(data);
        } else if (exerciseType == 'Aquatic Flowsheet') {
          objective_exercise_data.aquatic_exercise.push(data);
        }
        await ObjectiveModel.findOneAndUpdate(query, objective_exercise_data);
      }
   
      message = soapMessage.upadteExercise;
    } else {
      let insert_data = {
        appointmentId: query.appointmentId,
        soap_note_type: data.soap_note_type,
        createdBy: data.createdBy,
      }

      if (exerciseType == 'Land Flowsheet') {
        Object.assign(insert_data, { land_exercise: data })
      } else if (exerciseType == 'Aquatic Flowsheet') {
        Object.assign(insert_data, { aquatic_exercise: data })
      }

      await ObjectiveModel.create(insert_data)
      message = soapMessage.addExercise;
    }
    commonHelper.sendResponse(res, 'success', {}, message);
  } catch (error) {
    console.log(' ***************** ', error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


async function subjectiveAppointmentsList(queryMatch,soap_note_type) {
   //console.log('queryMatch >>>>',queryMatch)
    const query = [
      {
        $match: queryMatch,
      },
      {
        $lookup: {
          from: 'subjectives', 
          let: { appointmentId: '$_id' }, 
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$appointmentId', '$$appointmentId'] }, 
                    { $eq: ['$soap_note_type', soap_note_type] },  
                  ],
                },
              },
            },
          ],
          as: 'obj', 
        },
      },
      {
        $project: {
          '_id': 1, 'obj.note_date': 1,'obj.appointmentId':1, 'obj.soap_note_type': 1, 'obj.status': 1,'appointmentDate': 1
        },
      },
    ];

    const data = await Appointment.aggregate(query).sort({ appointmentDate: -1 });;
 
    let appointmentDateList = [];
    if (data.length > 0) {
      appointmentDateList = data.filter((item) => {
        return moment(item.appointmentDate).utc().format();
      });
    }
  //console.log('appointmentDateList >>>>',appointmentDateList)
  return appointmentDateList;
}

async function appointmentsList(casename, patientId) {
  let appointmentDateList = await Appointment.find({ patientId: patientId, caseName: casename }, { _id: 1, appointmentDate: 1 }).sort({ createdAt: -1 });
  // let appointmentDateList = [];  
  // if (data.length > 0) {
  //   data.map((obj) => {
  //       appointmentDateList.push({'status':'','appointment' : [{'appointmentDate':moment(obj.appointmentDate).utc().format()}]})
  //   })     
  // }
  return appointmentDateList;
}




module.exports = {
  getSubjectiveData,
  submitSubjective,
  getObjectiveData,
  submitObjective,
  submitObjectiveExercise,

  // createPlanNote,
  // getPlanNote,
  // updatePlanNote,
  // createBillingNote,
  // getBillingNote,
  // updateBillingNote,
  // finalizeNote,
  // 

  // submitAssessment,
  // getAssessment,
  // getAppointmentNoteList,
  // submitCaseNote,
  // getCaseNoteData,
  // deleteSoapNote,
  // deleteCaseSoapNote,
  // createAddendum,
  // getInitialExamination,
  // sendFax,
  // getOnePageNoteDetails,
  // getFaxHistory
};