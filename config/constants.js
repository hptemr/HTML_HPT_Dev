var constants = {
  s3Details: {
    url : "https://s3.amazonaws.com/hpt.dev/",
    bucketName: "hpt.dev",
    awsKey:process.env.AWS_KEY,
    awsSecret:process.env.AWS_SECRET,
    serveUrl: process.env.BASE_URL,
    defaultProfileImageName:"default.png",
    patientDocumentFolderPath: "patient-documents/",
    profileImageFolderPath: "profile-images/",
    patientInsuranceFolderPath: "patient-insurance/",
    patientPrescriptionFolderPath: "patient-prescription/",
    documentsFolderPath: "manage-documents/",
  },
  ses: {
    region: 'us-east-1',
    key: "",
	  secret: "",
    fromEmail: "pankajk@arkenea.com",
  },
  gmail: {
    email: process.env.EMAIL,
    secret: process.env.EMAIL_SECRET,
    fromEmail: process.env.FROM_EMAIL,
  },
  clientUrl: process.env.BASE_URL || 'http://dev.hamiltonpt.com',
  mailServerUrl : process.env.mailServerUri || 'http://dev.hamiltonpt.com',
}

module.exports = constants