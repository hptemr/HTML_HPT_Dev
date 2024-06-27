const User = require('../models/userModel');
const Referral = require('../models/referralModel');
const { commonMessage, appointmentMessage } = require('../helpers/message');
const commonHelper = require('../helpers/common');
const PatientTemp = require('../models/patientTempModel');
const Appointment = require('../models/appointmentModel');

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
    let totalCount = 10
    let referralList = await Referral.aggregate([
      {
        "$lookup": {
          from: "patients",
          localField: "patientId",
          foreignField: "_id",
          as: "patientInfo"
        }
      },
      {
        "$unwind": "$patientInfo"
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
        "$unwind": "$appointment"
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
        $match: queryMatch
      }, {
        $project: {
          'referredBy': 1, 'createdAt': 1,
          'patientInfo.firstName': 1, 'patientInfo.lastName': 1, 'patientInfo.email': 1, 'patientInfo.profileImage': 1,
          'appointment.status': 1, 'appointment.appointmentDate': 1, 'appointment.practiceLocation': 1, 'appointment.intakeFormSubmit': 1
        }
      }]).sort(order).skip(offset).limit(limit);

    commonHelper.sendResponse(res, 'success', { referralList, totalCount }, '');
  } catch (error) {
    console.log("**********error&********", error)
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

module.exports = {
  getReferralDetails,
  getReferralList,
  createAppointment
};