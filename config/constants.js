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
  clientUrl: process.env.clientUrl || 'http://ec2-34-239-203-1.compute-1.amazonaws.com:8080',
  mailServerUrl : process.env.mailServerUri || 'http://ec2-34-239-203-1.compute-1.amazonaws.com:8080',
}

module.exports = constants