
let serverUrlEnv = ""
let bucketName = "hpt.dev"
if (window.location.hostname.indexOf("localhost") > -1) {
  serverUrlEnv = "http://localhost:3000"
} else if (window.location.hostname.indexOf("dev.hamiltonpt.com") > -1) {
  serverUrlEnv = 'http://dev.hamiltonpt.com' //Development Server
} else if (window.location.hostname.indexOf("staging.hamiltonpt.com") > -1) {
  serverUrlEnv = 'http://staging.hamiltonpt.com' //Staging Server
} else {
  serverUrlEnv = 'http://ec2-34-239-203-1.compute-1.amazonaws.com'
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
}
export const webTitle = "HPT"
export const serverUrl = serverUrlEnv
export const pageSize = 5
export const pageSizeOptions = [5, 10, 20, 25]
export const practiceLocations = [
  "Corvallis PT",
  "Darby PT",
  "Frenchtown PT",
  "Hamilton PT at The Canyons",
  "HNB",
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
export const appointmentStatus = [
  "Accepted",
  "Pending",
  "Active",
  "Rescheduled",
  "Cancelled",
  "Declined",
  "Completed",
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
  'Single',
  'Married',
  'Divorced',
  'Widowed'
]

export const relationWithPatient = [
  'Friend',
  'Father',
  'Mother',
  'Wife',
  'Husband'
]
