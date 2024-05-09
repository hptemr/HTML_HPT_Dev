var constants = {
  s3Details: {
    url : "https://s3.amazonaws.com/hpt.dev/",
    bucketName: "hpt.dev",
    awsKey:process.env.AWS_KEY,
    awsSecret:process.env.AWS_SECRET,
    serveUrl: process.env.BASE_URL,
    patientDocumentFolderPath: "patient-documents/",
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
  clientUrl: process.env.BASE_URL || 'https://ec2-34-239-203-1.compute-1.amazonaws.com',
  mailServerUrl : process.env.mailServerUri || 'https://ec2-34-239-203-1.compute-1.amazonaws.com',
}

module.exports = constants