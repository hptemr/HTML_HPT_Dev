const mongoose = require('mongoose')

const sopeNotesSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.ObjectId,
        ref: "cases"
    },
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
    },
    soapnoteId: { type: mongoose.Schema.ObjectId},
    soap_note_type: {
        type: String,
        enum: ['initial_examination','daily_note','progress_note','discharge_note','case_note'],
        default: 'initial_examination'
    },
    notes:{ type: Array, default: [] },  
    status: { type: String, enum: ['Draft', 'Finalized'], default: 'Draft' },
    is_deleted:{ type: Boolean,default:false },
    is_disabled:{ type: Boolean,default:false },
    addendumId: { type: mongoose.Schema.ObjectId},
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
   //version: { type: String, default: 'v1' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('sope_notes', sopeNotesSchema)

//Subjective
// {

//     "note_date": "2025-02-18T23:45:00.000Z",
//     "diagnosis_code": [
//         {
//             "code": "M25.511",
//             "name": "Pain in right shoulder"
//         },
//         {
//             "code": "M25.552",
//             "name": "Pain in left hip"
//         },
//         {
//             "code": "M25.521",
//             "name": "Pain in right elbow"
//         }
//     ],
//     "treatment_side": "Left",
//     "surgery_date": "2024-12-18T18:30:00.000Z",
//     "surgery_type": "Asdasdasd asd",
//     "subjective_note": "As dsa dasd asd asd asd",
//     "updateInfo": [
//         {
//             "fromAdminId": "6650397fa6bb05011dde0952",
//             "userRole": "therapist",
//             "updatedAt": "2024-12-20T07:04:00.952Z"
//         }
//     ],
//     "note_type": "initial_examination"
// }