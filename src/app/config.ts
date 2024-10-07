
let serverUrlEnv = ""
let bucketName = "hpt.dev"
export const appointmentDirectory = '66a1dfbd79ac8729a98d0b80'
export const protocolDirectory = '66a1dfcd79ac8729a98d2caf'
if (window.location.hostname.indexOf("localhost") > -1) {
  serverUrlEnv = "http://localhost:3000"
} else if (window.location.hostname.indexOf("dev.hamiltonpt.com") > -1) {
  serverUrlEnv = 'http://dev.hamiltonpt.com' //Development Server
} else if (window.location.hostname.indexOf("staging.hamiltonpt.com") > -1) {
  serverUrlEnv = 'http://staging.hamiltonpt.com' //Staging Server
} else {
  //serverUrlEnv = 'https://ec2-34-239-203-1.compute-1.amazonaws.com' //dev
  serverUrlEnv = 'http://ec2-3-91-254-185.compute-1.amazonaws.com'   //staging
}

export const s3Details = {
  url: "https://s3.us-east-2.amazonaws.com/" + bucketName,
  awsS3Url: "https://s3.amazonaws.com/" + bucketName + '/',
  //awsserverUrl : "https://"+bucketName+".s3.amazonaws.com/",
  awss3PublicUrl: "https://" + bucketName + ".s3.amazonaws.com",
  awsserverUrl: "https://" + bucketName + ".s3.us-east-2.amazonaws.com/",
  bucketName: bucketName,
  userProfileFolderPath: "profile-images/",
  userDocumentFolderPath: "patient-documents/",
  patientInsuranceFolderPath: "patient-insurance/",
  patientPrescriptionFolderPath: "patient-prescription/",
}
export const webTitle = "HPT"
export const serverUrl = serverUrlEnv
export const pageSize = 10
export const pageSizeOptions = [10, 25, 50]
export const maxAppoinmentFutureMonths = 9
export const practiceLocations = [
  "Corvallis PT",
  "Darby PT",
  "Frenchtown PT",
  "Hamilton PT at The Canyons",
  "HNBC",
  "PT Specialists of Florence",
  "Stevi PT",
]
export const urlSegmentAndUserRole = [
  { urlSegment: 'practice-admin', userRole: 'practice_admin' },
  { urlSegment: 'therapists', userRole: 'therapist' },
  { urlSegment: 'support-team', userRole: 'support_team' },
  { urlSegment: 'billing-team', userRole: 'billing_team' }
]
export const documents_list = [
  "Driver's License",
  "Military ID",
  "Montana ID",
  "Other"
]
// export const appointmentStatus = [
//   "Accepted",
//   "Pending",
//   "Active",
//   "Rescheduled",
//   "Cancelled",
//   "Declined",
//   "Completed",
// ]
export const appointmentStatus = [
  "Pending Intake Form",
  "Scheduled",
  // "Not Scheduled",
]
export const bookingStatus = [
  'Approved',
  'Cancelled',
  'Completed',
  'Pending',
  'Suspended'
]
export const userStatus = [
  'Pending',
  'Active',
  'Suspended',
  'Deleted',
  'Blocked'
]
export const maritalStatus = [
  'Married',
  'Unmarried',
]
export const relationWithPatient = [
  'Friend',
  'Father',
  'Mother',
  'Wife',
  'Husband',
  'Other'
]
export const carrierNameList = [
  'Carrier 1',
  'Carrier 2',
  'Carrier 3',
]

// ==== Comet Chat Settings  ====
// Free Account(ashishb@arkenea.com) App Name : HPT
let cometChatCredential = {
  authKey: 'f81c1fd5635b9c277f63c56dfd1bcb95a12fcdd3',
  appId: '26118921798ec2ec',
  region: 'us',
}

export const defaultAssessmentText = "Thank you for referring PATIENT_NAME to our practice, PATIENT_NAME received  an initial evaluation and treatment today *todays date*. As per your referral, we will see PATIENT_NAME ___ times per week for ___ weeks with a focus on *first 3 treatments to be added*. I will update you on PATIENT_NAME progress as appropriate, thank you for the opportunity to assist with their rehabilitation.";
export const defaultSupportDocText = "1. Neuromuscular Re-education completed to assist with reactive and postural responses, and improving anticipatory responses for dynamic activities. =Neuromuscular Re-Education, 97112 \n 2.Therapeutic Activity completed for improving functional transitioning performance to assist in performance of ADL's= Therapeutic Activity, 97530 \n 3. Patient is unable to complete physical therapy on land. = Aquatic Exercise, 97113 \n 4. Vasopneumatic device required to assist with reduction in effusion in combination with cryotherapy to improve functional performance through reduced effusion and improved range of motion and motor facilitation and / or used as contrast or thermotherapy to improve circulation, modulate pain, and improve functional range of motion = Vasopneumatic Device 97016 \n 5. If any item from the DME section is selected then the following data is shown in the Supporting Documentation Page with a space between any content present above, if it is present.Text to be added: DME was issued today with instructions on wear, care, and use required for full rehabilitation potential";
if (window.location.hostname.indexOf("dev.hamiltonpt.com") > -1) {
  // Free Account(ashishb@arkenea.com) App Name : HPT
  cometChatCredential = {
    authKey: 'f81c1fd5635b9c277f63c56dfd1bcb95a12fcdd3', 
    appId: '26118921798ec2ec',
    region: 'us',
  }
} else if (window.location.hostname.indexOf("staging.hamiltonpt.com") > -1) {
  // Free Account(ashishb@arkenea.com) App Name : HPT Staging
  cometChatCredential = {
    authKey: 'ebf7ce6ad79f4cb25edb508095a7db4fe3572659', 
    appId: '26516651acb282a6',
    region: 'us',
  }
}
export const cometChatCredentials = cometChatCredential;
