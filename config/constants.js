var constants = {
  s3Details: {
    url : "",
    bucketName: "dev",
    awsKey:"",
    awsSecret:"",
    profilePicturesPath:"profilePictures/",
    serveUrl: ""
  },
  ses: {
    region: 'us-east-1',
    key: "",
	  secret: "",
    fromEmail: "pankajk@arkenea.com",
  },
  gmail: {
    email: process.env.EMAIL,
    secret: process.env.SECRET,
    fromEmail: process.env.FROM_EMAIL,
  },
  clientUrl: process.env.clientUrl || 'https://ec2-34-239-203-1.compute-1.amazonaws.com',
  mailServerUrl : process.env.mailServerUri || 'https://ec2-34-239-203-1.compute-1.amazonaws.com',
}

module.exports = constants