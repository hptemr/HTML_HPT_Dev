const User = require('../models/userModel');
const Referral = require('../models/referralModel');
const { commonMessage, appointmentMessage, infoMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const PatientTemp = require('../models/patientTempModel');
const Appointment = require('../models/appointmentModel');
const triggerEmail = require('../helpers/triggerEmail');
require('dotenv').config();
let ObjectId = require('mongoose').Types.ObjectId;

const getReferralDetails = async (req, res) => {
  try {
    const { query, fields } = req.body
    const result = await Referral.findOne(query, fields);
    commonHelper.sendResponse(res, 'success', result, '');
  } catch (error) {
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getReferralList = async (req, res) => {
  try {
    const { queryMatch, order, offset, limit } = req.body;
    
    let totalRecords = await Referral.aggregate([
      {
        "$lookup": {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patient"
        }
      },
      {
        "$unwind": {
          path: "$patient",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        "$lookup": {
          from: "appointments",
          localField: "appointmentId",
          foreignField: "_id",
          as: "appointment"
        },
      },
      {
        "$unwind": {
          path: "$appointment",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        "$lookup": {
          from: "users",
          localField: "appointment.therapistId",
          foreignField: "_id",
          as: "therapist"
        },
      },
      {
        "$unwind": {
          path: "$therapist",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: queryMatch
      }, {
        $project: {
          'referredBy': 1, 'createdAt': 1,
          'therapist.firstName': 1, 'therapist.lastName': 1,
          // 'patient.firstName': 1, 'patient.lastName': 1, 'patient.email': 1, 'patient.profileImage': 1,
          'patient.firstName': { $ifNull: ["$patient.firstName", ""] }, 'patient.lastName': { $ifNull: ["$patient.lastName", ""] }, 'patient.email': { $ifNull: ["$patient.email", ""] }, 'patient.profileImage': { $ifNull: ["$patient.profileImage", ""] },
          'appointment._id': 1, 'appointment.status': 1, 'appointment.appointmentDate': 1, 'appointment.practiceLocation': 1, 'appointment.intakeFormSubmit': 1
        }
      }])

    let referralList = await Referral.aggregate([
      {
        "$lookup": {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patient"
        }
      },
      {
        "$unwind": {
          path: "$patient",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        "$lookup": {
          from: "appointments",
          localField: "appointmentId",
          foreignField: "_id",
          as: "appointment"
        },
      },
      {
        "$unwind": {
          path: "$appointment",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        "$lookup": {
          from: "users",
          localField: "appointment.therapistId",
          foreignField: "_id",
          as: "therapist"
        },
      },
      {
        "$unwind": {
          path: "$therapist",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: queryMatch
      },
      {
        $project: {
          'referredBy': 1, 'createdAt': 1,
          'therapist.firstName': 1, 'therapist.lastName': 1,
          // 'patient.firstName': 1, 'patient.lastName': 1, 'patient.email': 1, 'patient.profileImage': 1,
          'patient.firstName': { $ifNull: ["$patient.firstName", ""] }, 'patient.lastName': { $ifNull: ["$patient.lastName", ""] }, 'patient.email': { $ifNull: ["$patient.email", ""] }, 'patient.profileImage': { $ifNull: ["$patient.profileImage", ""] },
          'appointment._id': 1, 'appointment.status': 1, 'appointment.appointmentDate': 1, 'appointment.practiceLocation': 1, 'appointment.intakeFormSubmit': 1
        }
      }]).sort(order).skip(offset).limit(limit);

    let totalCount = totalRecords.length
    commonHelper.sendResponse(res, 'success', { referralList, totalCount }, '');
  } catch (error) {
    console.log("**********error********", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const createAppointment = async (req, res) => {
  try {
    const { isEmailExist } = req.body;
    let patientData = { email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName }
    let appointmentData = {
      appointmentDate: req.body.appointmentDate,
      practiceLocation: req.body.practiceLocation,
      therapistId: req.body.therapist,
      patientId: req.body.patientId
    }
    // Step1 - create patient if not exist
    let patientRes = { patientCreated: false, patientData: null }
    if (!isEmailExist) {
      patientRes = await createPatient(patientData).catch((_res) => { return _res })
      appointmentData.patientId = patientRes.patientData._id

      // encryptToken for sign up
      let tokenObj = { patientId: patientRes.patientData._id }
      let encryptToken = commonHelper.encryptData(tokenObj, process.env.CRYPTO_SECRET)
      const link = `${process.env.BASE_URL}/signup?signUpToken=${encryptToken}`;
      // send email (sign up link)
      triggerEmail.patientSignupThroughRefferal('patientSignUpThroughRefferal', patientRes.patientData, link)
    }

    // Step2 - create appointment
    let appointmentRes = await createPatientAppointment(appointmentData).catch((_res) => { return _res })
    if (appointmentRes.appointmentCreated) {
      // Step3 - save referral data
      let referralData = {
        patientId: (!isEmailExist) ? patientRes.patientData._id : req.body.patientId,
        appointmentId: appointmentRes.appointmentData._id,
        streetName: req.body.streetName,
        referredBy: req.body.referredBy,
        phone: req.body.phoneNumber,
        appartment: req.body.appartment,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode
      }
      let referralRecord = new Referral(referralData)
      let result = await referralRecord.save()
      // send email (Appointment Booked)
      triggerEmail.appointmentBookedThroughRefferal('appointmentBookedThroughRefferal', patientRes.patientData, link)
      commonHelper.sendResponse(res, 'success', result, appointmentMessage.created);
    } else {
      if (!isEmailExist) {
        // Delete created patient if error came while creating appointment
        let patientId = (patientRes.patientData && patientRes.patientData._id) ? patientRes.patientData._id : ''
        await PatientTemp.findByIdAndDelete(patientId);
      }
      commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
    }

  } catch (error) {
    console.log("error>>>", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const createPatient = (patientData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newPatient = new PatientTemp(patientData);
      let result = await newPatient.save();
      resolve({ patientCreated: true, patientData: result });
    } catch (error) {
      reject({ patientCreated: false, patientData: null })
    }
  })
}

const createPatientAppointment = (appointmentData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let existingAppointmentData = await Appointment.findOne({}, { appointmentId: 1 }).sort({ createdAt: -1 }).limit(1)
      appointmentData.appointmentId = existingAppointmentData.appointmentId + 1
      let newRecord = new Appointment(appointmentData)
      let result = await newRecord.save()
      resolve({ appointmentCreated: true, appointmentData: result });
    } catch (error) {
      reject({ appointmentCreated: false, appointmentData: null })
    }
  })
}

const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body
    await Referral.deleteOne({ appointmentId: appointmentId })
    await Appointment.deleteOne({ _id: appointmentId })
    commonHelper.sendResponse(res, 'success', null, infoMessage.deleted);
  } catch (error) {
    console.log("*************deleteAppointment**error*****", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const getPatientThroughSignUpToken = async (req, res) => {
  try {
    const { signUpToken } = req.body
    let decryptTokenData = commonHelper.decryptData(signUpToken, process.env.CRYPTO_SECRET)
    let patientId= decryptTokenData? decryptTokenData.patientId:''
    let patientData = await PatientTemp.findOne({ _id: patientId });
    commonHelper.sendResponse(res, 'success', patientData, '');
  } catch (error) {
    console.log("*************getPatientThroughSignUpToken**error*****", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}


const getAppointmentDataById = async (req, res) => {
  try {
    const { referralId } = req.body;
    let referralData = await Referral.aggregate([
      {$match: {_id:new ObjectId(referralId)} },
      {
        "$lookup": {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patient"
        }
      },
      {
        "$unwind": {
          path: "$patient",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        "$lookup": {
          from: "appointments",
          localField: "appointmentId",
          foreignField: "_id",
          as: "appointment"
        },
      },
      {
        "$unwind": {
          path: "$appointment",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        "$lookup": {
          from: "users",
          localField: "appointment.therapistId",
          foreignField: "_id",
          as: "therapist"
        },
      },
      {
        "$unwind": {
          path: "$therapist",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          'referredBy': 1, 'phone':1,'streetName':1,'appartment':1,'state':1,'city':1,'zipcode':1,'createdAt': 1,
          'therapist._id': 1,'therapist.firstName': 1, 'therapist.lastName': 1,
          // 'patient.firstName': 1, 'patient.lastName': 1, 'patient.email': 1, 'patient.profileImage': 1,
          'patient.firstName': { $ifNull: ["$patient.firstName", ""] }, 'patient.lastName': { $ifNull: ["$patient.lastName", ""] }, 'patient.email': { $ifNull: ["$patient.email", ""] }, 'patient.profileImage': { $ifNull: ["$patient.profileImage", ""] },
          'appointment._id': 1, 'appointment.status': 1, 'appointment.appointmentDate': 1, 'appointment.practiceLocation': 1, 'appointment.intakeFormSubmit': 1
        }
      }])
    commonHelper.sendResponse(res, 'success', referralData, '');
  } catch (error) {
    console.log("**********getAppointmentDataById error********", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

const updateAppointment = async (req, res) => {
  try {
    const { refferalId } = req.body;
    let referralData = await Referral.findOne({ _id: refferalId })
    // Update Appointment 
    const filterAppointment = { _id: new ObjectId(referralData.appointmentId) };
    const updateAppointment = {
      $set: {
        appointmentDate: req.body.appointmentDate,
        practiceLocation: req.body.practiceLocation,
        therapistId: req.body.therapist
      }
    };
    let optionsAppointment = { returnOriginal: false };
    await Appointment.findOneAndUpdate(filterAppointment, updateAppointment, optionsAppointment);

    // Update Refferal 
    const filterRefferal = { _id: new ObjectId(refferalId) };
    const updateRefferal = {
      $set: {
          streetName: req.body.streetName,
          referredBy: req.body.referredBy,
          phone: req.body.phoneNumber,
          appartment: req.body.appartment,
          state: req.body.state,
          city: req.body.city,
          zipcode: req.body.zipcode
      }
    };
    let optionsRefferal = { returnOriginal: false };
    await Referral.findOneAndUpdate(filterRefferal, updateRefferal, optionsRefferal);
    commonHelper.sendResponse(res, 'success', null, appointmentMessage.updated);
  } catch (error) {
    console.log("*** updateAppointment error **>>>", error)
    commonHelper.sendResponse(res, 'error', null, commonMessage.wentWrong);
  }
}

module.exports = {
  getReferralDetails,
  getReferralList,
  createAppointment,
  deleteAppointment,
  getPatientThroughSignUpToken,
  getAppointmentDataById,
  updateAppointment
};