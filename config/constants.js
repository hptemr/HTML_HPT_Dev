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
  inviteTokenExpiry : 1440, // In minute (24 Hrs)
  // cometChatAppId : '26118921798ec2ec',
  // cometChatApikey : '488b6023fe0a9ca50778dbeea85b8fe5e8ecd34d'
  cometChatAppId : (process.env.BASE_URL == 'http://staging.hamiltonpt.com')?'26516651acb282a6': (process.env.BASE_URL == 'http://dev.hamiltonpt.com')?'26118921798ec2ec':'26118921798ec2ec',
  cometChatApikey : (process.env.BASE_URL == 'http://staging.hamiltonpt.com')?'dd11efe2e776cce14e3480d3cf720b8789485f82': (process.env.BASE_URL == 'http://dev.hamiltonpt.com')?'488b6023fe0a9ca50778dbeea85b8fe5e8ecd34d':'488b6023fe0a9ca50778dbeea85b8fe5e8ecd34d',
}

module.exports = constants